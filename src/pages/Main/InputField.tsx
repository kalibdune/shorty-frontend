import React from 'react'

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
			<button className='button' type='submit'>
				Сократить
			</button>
		</div>
	)
}

export default InputField
