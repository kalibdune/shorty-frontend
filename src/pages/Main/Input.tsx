import React, { useState, useMemo, useRef, useEffect } from "react";
import "./Main.scss";

enum ExpOpts {
    Day = "day",
    Week = "week",
    Unlimited = "unlimited",
    Custom = "custom"
}

type InputProps = {
    url: string
    setTitle: (url: string) => void
}

const getRandomPlaceholderDay = (): string => {
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const randomMonths = Math.floor(Math.random() * 12);
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() + randomDays);
    randomDate.setMonth(randomDate.getMonth() + randomMonths);
    return randomDate.toLocaleDateString('ru-RU');
}

const Main: React.FC<InputProps> = ({ url, setTitle }: InputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(ExpOpts.Day);
    const [optionInputValue, setOptionInputValue] = useState("");
    const optionInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (optionInputRef.current) {
            if (selectedOption === ExpOpts.Custom) {
                optionInputRef.current.classList.add("show");
                optionInputRef.current.classList.remove("hide");
            } else if (optionInputRef.current.classList.contains("show") || optionInputRef.current.classList.contains("hide")) {
                optionInputRef.current.classList.add("hide");
                optionInputRef.current.classList.remove("show");
            }
        }
    }, [selectedOption, optionInputValue]);

    const optionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptionInputValue(event.target.value);
    };

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const optionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value as ExpOpts);
    };

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(inputValue, selectedOption, optionInputValue);
        setInputValue("");
        setOptionInputValue("");
        setSelectedOption(ExpOpts.Day);
        setTitle(inputValue)
        event.preventDefault();
    };

    const placeholderDay: string = useMemo(() => getRandomPlaceholderDay(), []);

    return (
        <form className="container" onSubmit={submitForm}>
            <div className="input-container">
                <input
                    type="text"
                    className="input-box"
                    placeholder="https://example.com/"
                    value={inputValue}
                    onChange={inputChange}
                />
                <button className="button" type="submit">
                    Сократить
                </button>
            </div>

            <div className="options-container">
                <div className="options">
                    <label className={`option-button${selectedOption === ExpOpts.Day ? '-checked' : ''}`}>
                        <input
                            type="radio"
                            name="expiration"
                            value={ExpOpts.Day}
                            checked={selectedOption === ExpOpts.Day}
                            onChange={optionChange}
                        />
                        24ч
                    </label>
                    <label className={`option-button${selectedOption === ExpOpts.Week ? '-checked' : ''}`}>
                        <input
                            type="radio"
                            name="expiration"
                            value={ExpOpts.Week}
                            checked={selectedOption === ExpOpts.Week}
                            onChange={optionChange}
                        />
                        Неделя
                    </label>
                    <label className={`option-button${selectedOption === ExpOpts.Unlimited ? '-checked' : ''}`}>
                        <input
                            type="radio"
                            name="expiration"
                            value={ExpOpts.Unlimited}
                            checked={selectedOption === ExpOpts.Unlimited}
                            onChange={optionChange}
                        />
                        Безгранично
                    </label>
                    <label className={`option-button${selectedOption === ExpOpts.Custom ? '-checked' : ''}`}>
                        <input
                            type="radio"
                            name="expiration"
                            value={ExpOpts.Custom}
                            checked={selectedOption === ExpOpts.Custom}
                            onChange={optionChange}
                        />
                        Свое время
                    </label>
                </div>
                <input
                    type="text"
                    className="input-box-options"
                    placeholder={placeholderDay}
                    value={optionInputValue}
                    onChange={optionInputChange}
                    ref={optionInputRef}
                />
            </div>
        </form>
    );
};

export default Main;