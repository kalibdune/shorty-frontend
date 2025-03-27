import React from 'react'

enum ExpOpts {
	Day = '24 часа',
	Week = 'Неделя',
	Unlimited = 'Бзелимитно',
	Custom = 'Свое время',
}

type ExpirationOptionsProps = {
	selectedOption: ExpOpts
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ExpirationOptions: React.FC<ExpirationOptionsProps> = ({
	selectedOption,
	onChange,
}) => {
	return (
		<div className='options'>
			{Object.values(ExpOpts).map((option) => (
				<label
					key={option}
					className={`option-button${selectedOption === option ? '-checked' : ''}`}
				>
					<input
						type='radio'
						name='expiration'
						value={option}
						checked={selectedOption === option}
						onChange={onChange}
					/>
					{option.valueOf()}
				</label>
			))}
		</div>
	)
}

export default ExpirationOptions
