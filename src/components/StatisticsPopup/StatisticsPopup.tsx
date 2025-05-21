import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import './StatisticsPopup.scss';
import { UrlRedirectRequest, UrlRedirectStatistic } from '../../types/api';
import { ApiService } from '../../utils/api';

interface HourlyData {
    hour: string;
    count: number;
}

interface StatisticsChartProps {
    urlId: string;
}

const StatisticsPopup: React.FC<StatisticsChartProps> = ({
    urlId
}) => {
    const apiRef = useRef<ApiService>(new ApiService());
    const [selectedRange, setSelectedRange] = useState<number>(1);
    const [apiData, setApiData] = useState<UrlRedirectStatistic | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        setIsLoading(true);
        setError(null);

        const endDate = new Date();
        const startDate = new Date();

        startDate.setDate(endDate.getDate() - selectedRange);
        const payload: UrlRedirectRequest = {
            started_at: startDate,
            ended_at: endDate
        };

        apiRef.current.getUrlStatistic(urlId, payload)
            .then((res: UrlRedirectStatistic) => {
                setApiData(res);
            })
            .catch((err) => {
                console.error('Ошибка при получении статистики:', err);
                setError('Не удалось загрузить данные статистики. Пожалуйста, попробуйте позже.');
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [selectedRange]);


    const chartData = useMemo(() => {
        if (!apiData || !apiData.url_redirections || apiData.url_redirections.length === 0) {
            return [];
        }
        const now = new Date();
        const startDate = new Date();
        startDate.setDate(now.getDate() - selectedRange);

        const filteredRedirects = apiData.url_redirections.filter(redirect => {
            const redirectDate = new Date(redirect.created_at);
            return redirectDate >= startDate && redirectDate <= now;
        });

        if (filteredRedirects.length === 0) {
            return [];
        }

        const hourlyMap = new Map<string, number>();
        const timeOffset = -(new Date().getTimezoneOffset()) / 60

        const formatDateToMoscowTime = (utcDateStr: string): string => {
            const utcDate = new Date(utcDateStr);
            const moscowDate = new Date(utcDate);

            moscowDate.setHours(moscowDate.getHours() + timeOffset);
            const day = moscowDate.getDate();
            const month = moscowDate.getMonth() + 1;
            const hours = moscowDate.getHours();

            return `${day}/${month} ${hours}:00`;
        };

        filteredRedirects.forEach(redirect => {
            const hourKey = formatDateToMoscowTime(redirect.created_at);

            if (hourlyMap.has(hourKey)) {
                hourlyMap.set(hourKey, hourlyMap.get(hourKey)! + 1);
            } else {
                hourlyMap.set(hourKey, 1);
            }
        });

        const result: HourlyData[] = Array.from(hourlyMap.entries()).map(([hour, count]) => ({
            hour,
            count
        }));

        return result.sort((a, b) => {
            const dateA = a.hour.split(' ')[0].split('/');
            const dateB = b.hour.split(' ')[0].split('/');
            const timeA = a.hour.split(' ')[1].split(':');
            const timeB = b.hour.split(' ')[1].split(':');

            const dateObjA = new Date(now.getFullYear(), parseInt(dateA[1]) - 1, parseInt(dateA[0]), parseInt(timeA[0]));
            const dateObjB = new Date(now.getFullYear(), parseInt(dateB[1]) - 1, parseInt(dateB[0]), parseInt(timeB[0]));

            return dateObjA.getTime() - dateObjB.getTime();
        });
    }, [apiData, selectedRange]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} (МСК)`}</p>
                    <p className="desc">{`Количество переходов: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRange(parseInt(e.target.value));
    };

    return (
        <div className="statistics-chart">
            <div className="statistics-controls">
                <label htmlFor="dateRange">Показать статистику за: </label>
                <select
                    id="dateRange"
                    value={selectedRange}
                    onChange={handleRangeChange}
                    className="range-select"
                >
                    <option value={1}>1 день</option>
                    <option value={3}>3 дня</option>
                    <option value={7}>7 дней</option>
                    <option value={14}>14 дней</option>
                    <option value={30}>30 дней</option>
                </select>
            </div>

            <div className="chart-container">
                {isLoading && (
                    <div className="loading-indicator">Загрузка данных...</div>
                )}

                {error && (
                    <div className="error-message">{error}</div>
                )}

                {!isLoading && !error && chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="hour"
                                angle={-45}
                                textAnchor="end"
                                height={70}
                                label={{ value: 'Время (МСК)', position: 'insideBottomRight', offset: -10 }}
                            />
                            <YAxis label={{ value: 'Переходы', angle: -90, position: 'insideLeft' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                name="Количество переходов"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    !isLoading && !error && (
                        <div className="no-data">Нет данных о переходах для отображения в выбранном диапазоне</div>
                    )
                )}
            </div>

            {apiData && apiData.count > 0 && (
                <div className="statistics-summary">
                    <p>Всего переходов: <strong>{apiData.count}</strong></p>
                </div>
            )}
        </div>
    );
};

export default StatisticsPopup;