import React, { useEffect, useRef, useState } from 'react'
import { ExpOpts } from '../../types/enums'

type CustomExpirationInputProps = {
	optionInputValue: string
	placeholder: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	selectedOption: ExpOpts
	dateInputRef: React.RefObject<HTMLInputElement | null>
}

const CustomExpirationInput: React.FC<CustomExpirationInputProps> = ({
	optionInputValue,
	placeholder,
	onChange,
	selectedOption,
	dateInputRef,
}) => {
	useEffect(() => {
		if (dateInputRef.current) {
			if (selectedOption === ExpOpts.Custom) {
				dateInputRef.current.classList.add('show')
				dateInputRef.current.classList.remove('hide')
			} else if (
				dateInputRef.current.classList.contains('show') ||
				dateInputRef.current.classList.contains('hide')
			) {
				dateInputRef.current.classList.add('hide')
				dateInputRef.current.classList.remove('show')
			}
		}
	}, [selectedOption])

	return (
		<input
			type='text'
			className='input-box-options'
			placeholder={placeholder}
			value={optionInputValue}
			onChange={onChange}
			ref={dateInputRef}
		/>
	)
}

export default CustomExpirationInput
