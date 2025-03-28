import React, { useState, useRef } from 'react'
import { ExpOpts } from '../../types/enums'
import { validateDate, validateUrl } from '../../utils/validation'
import InputField from './InputField'
import ExpirationOptions from './ExpirationOptions'
import CustomExpirationInput from './CustomExpirationInput'
import './Main.scss'

type InputProps = {
	setTitle: (url: string) => void
}

const InputSection: React.FC<InputProps> = ({ setTitle }) => {
	const [inputValue, setInputValue] = useState('')
	const [selectedOption, setSelectedOption] = useState<ExpOpts>(ExpOpts.Day)
	const [optionInputValue, setOptionInputValue] = useState('')

	const urlInputRef = useRef<HTMLInputElement>(null)
	const dateInputRef = useRef<HTMLInputElement>(null)
	const optionsInputRef = useRef<HTMLInputElement>(null)

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		const isValidUrl = validateUrl(inputValue)
		const isValidDate =
			selectedOption === ExpOpts.Custom ? validateDate(optionInputValue) : true

		if (!isValidDate) {
			optionsInputRef.current?.classList.add('breathing-red')
		}
		if (!isValidUrl) {
			urlInputRef.current?.classList.add('breathing-red')
		}

		console.log(isValidUrl, isValidDate)

		if (isValidDate && isValidUrl) {
			setTitle(inputValue)
			setInputValue('')
			setOptionInputValue('')
			setSelectedOption(ExpOpts.Day)
		}
		event.preventDefault()
	}

	const changeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (urlInputRef.current?.classList.contains('breathing-red')) {
			urlInputRef.current.classList.remove('breathing-red')
		}
		setInputValue(e.target.value)
	}

	const changeDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (optionsInputRef.current?.classList.contains('breathing-red')) {
			optionsInputRef.current?.classList.remove('breathing-red')
		}
		setOptionInputValue(e.target.value)
	}

	return (
		<form className='container' onSubmit={submitForm}>
			<InputField
				inputValue={inputValue}
				onChange={changeUrlInput}
				urlInputRef={urlInputRef}
			/>
			<div className='options-container' ref={optionsInputRef}>
				<ExpirationOptions
					selectedOption={selectedOption}
					onChange={(e) => setSelectedOption(e.target.value as ExpOpts)}
				/>
				<CustomExpirationInput
					selectedOption={selectedOption}
					optionInputValue={optionInputValue}
					onChange={changeDateInput}
					dateInputRef={dateInputRef}
				/>
			</div>
		</form>
	)
}

export default InputSection
