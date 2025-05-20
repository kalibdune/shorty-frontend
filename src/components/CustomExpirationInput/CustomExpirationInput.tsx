import React, { useEffect, useMemo } from 'react'
import { ExpOpts } from '../../types/enums'
import { getRandomPlaceholderDay } from '../../utils/placeholders'

import './CustomExpirationInput.scss'

type CustomExpirationInputProps = {
	optionInputValue: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	selectedOption: ExpOpts
	dateInputRef: React.RefObject<HTMLInputElement | null>
}

const CustomExpirationInput: React.FC<CustomExpirationInputProps> = ({
	optionInputValue,
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

	const placeholderDay: string = useMemo(() => getRandomPlaceholderDay(), [])

	return (
		<input
			type='text'
			className='input-box-options'
			placeholder={placeholderDay}
			value={optionInputValue}
			onChange={onChange}
			ref={dateInputRef}
		/>
	)
}

export default CustomExpirationInput
