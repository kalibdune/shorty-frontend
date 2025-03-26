import React, { useState, useMemo, useRef } from "react"
import { ExpOpts } from "../../types/enums"
import { validateDate, validateUrl } from "../../utils/validation"
import InputField from "./InputField"
import ExpirationOptions from "./ExpirationOptions"
import CustomExpirationInput from "./CustomExpirationInput"
import "./Main.scss"

type InputProps = {
    url: string
    setTitle: (url: string) => void
}

const getRandomPlaceholderDay = (): string => {
    const randomDays = Math.floor(Math.random() * 30) + 1
    const randomMonths = Math.floor(Math.random() * 12)
    const randomDate = new Date()
    randomDate.setDate(randomDate.getDate() + randomDays)
    randomDate.setMonth(randomDate.getMonth() + randomMonths)
    return randomDate.toLocaleDateString("ru-RU")
}

const InputSection: React.FC<InputProps> = ({ url, setTitle }) => {
    const [inputValue, setInputValue] = useState("")
    const [selectedOption, setSelectedOption] = useState<ExpOpts>(ExpOpts.Day)
    const [optionInputValue, setOptionInputValue] = useState("")

    const urlInputRef = useRef<HTMLInputElement>(null)
    const dateInputRef = useRef<HTMLInputElement>(null)

    const placeholderDay: string = useMemo(() => getRandomPlaceholderDay(), [])

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        const isValidUrl = validateUrl(inputValue)
        const isValidDate = selectedOption === ExpOpts.Custom ? validateDate(optionInputValue) : true

        if (!isValidDate) {
            dateInputRef.current?.classList.add("breathing-red")
        }
        if (!isValidUrl) {
            urlInputRef.current?.classList.add("breathing-red")
        }

        console.log(isValidUrl, isValidDate);

        if (isValidDate && isValidUrl) {
            setTitle(inputValue)
            setInputValue("")
            setOptionInputValue("")
            setSelectedOption(ExpOpts.Day)
        }
        event.preventDefault()
    }

    const changeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (urlInputRef.current?.classList.contains("breathing-red")) {
            urlInputRef.current.classList.remove("breathing-red")
        }
        setInputValue(e.target.value)
    }

    return (
        <form className="container" onSubmit={submitForm}>
            <InputField inputValue={inputValue} onChange={changeUrlInput} urlInputRef={urlInputRef} />
            <div className="options-container">
                <ExpirationOptions selectedOption={selectedOption} onChange={(e) => setSelectedOption(e.target.value as ExpOpts)} />
                <CustomExpirationInput
                    selectedOption={selectedOption}
                    optionInputValue={optionInputValue}
                    placeholder={placeholderDay}
                    onChange={(e) => setOptionInputValue(e.target.value)}
                    dateInputRef={dateInputRef}
                />
            </div>
        </form>
    )
}

export default InputSection
