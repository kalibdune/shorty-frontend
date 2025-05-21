import { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import { ApiService } from '../../utils/api'
import StorageService from '../../utils/storage'
import {
	UrlPaginatedResponse,
	UrlResponse,
	UserResponse,
} from '../../types/api'
import UrlCard from '../../components/UrlCard/UrlCard'
import Button from '../../components/Button/Button'

const formatDate = (date: string): string =>
	new Date(date)
		.toLocaleString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(',', '')
		.replace(/\//g, '.')

const dataFormatting = (url: UrlResponse): UrlResponse => ({
	...url,
	created_at: formatDate(url.created_at),
	updated_at: formatDate(url.updated_at),
	expired_at: url.expired_at ? formatDate(url.expired_at) : url.expired_at,
})

const Urls: React.FC = () => {
	const pageSize = 5
	const [page, setPage] = useState(1)
	const [data, setData] = useState<UrlPaginatedResponse>()
	const api = new ApiService()

	useEffect(() => {
		const user = new StorageService().getItem<UserResponse>('user')
		if (!user) {
			throw new Error('cannot process getItem')
		}
		api.getUrlsByUser(user.id, page, pageSize).then((answer) => {
			setData(answer)
		})
	}, [page])

	const totalPages = data ? Math.ceil(data.total_count / pageSize) : 0

	const handlePrevPage = () => {
		if (page > 1) {
			setPage(page - 1)
		}
	}

	const handleNextPage = () => {
		if (page < totalPages) {
			setPage(page + 1)
		}
	}

	const handleDeleteUrl = (deletedUrlId: string) => {
		if (data) {
			setData({
				...data,
				urls: data.urls.filter((url) => url.id !== deletedUrlId),
				total_count: data.total_count - 1,
			})
		}
	}

	return (
		<>
			<Nav></Nav>
			<div className='container'>
				{data?.urls.map((card) => {
					const formattedCard = dataFormatting(card)
					return (
						<UrlCard
							key={formattedCard.id}
							url={formattedCard}
							onDelete={handleDeleteUrl}
						></UrlCard>
					)
				})}
				{data?.total_count == 0 && (
					<h1>Нет привязанных ссылок для пользователя</h1>
				)}
			</div>
			<div className='container'>
				{totalPages > 0 && (
					<div
						className='pagination'
						style={{
							display: 'flex',
							justifyContent: 'center',
							margin: '20px 0',
						}}
					>
						<Button
							onClick={handlePrevPage}
							disabled={page === 1}
							style={{ margin: '0 5px', padding: '5px 10px' }}
						>
							Предыдущая
						</Button>
						<span style={{ margin: '0 10px' }}>
							Страница {page} из {totalPages}
						</span>
						<Button
							onClick={handleNextPage}
							disabled={page >= totalPages}
							style={{ margin: '0 5px', padding: '5px 10px' }}
						>
							Следующая
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default Urls
