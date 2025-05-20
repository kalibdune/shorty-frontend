import React from 'react'
import Button from '../Button/Button'
import './InputField.scss'

type InputFieldProps = {
	inputValue: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	urlInputRef: React.RefObject<HTMLInputElement | null>
}

const InputField: React.FC<InputFieldProps> = ({
	inputValue,
	onChange,
	urlInputRef,
}) => {
	return (
		<div className='input-container' ref={urlInputRef}>
			<input
				type='text'
				className='input-box'
				placeholder='https://example.com/'
				value={inputValue}
				onChange={onChange}
			/>
			<Button type={'submit'}>Сократить</Button>
		</div>
	)
}

export default InputField
