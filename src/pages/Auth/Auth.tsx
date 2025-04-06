import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

export const Auth: React.FC = () => {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const navigator = useNavigate()
	const logged = false

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		navigator('/urls')
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit} className='container'>
				<div className='input-container'>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
						className='input-box'
						placeholder='example@example.com'
					/>
				</div>
				<div className='input-container'>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						required
						className='input-box'
						placeholder='some password'
					/>
				</div>
				<Button type={'submit'}>
					{!logged ? 'Зарегестрироваться' : 'Войти'}
				</Button>
			</form>
			{logged && <Button type={'button'}>{'Выйти'}</Button>}
		</div>
	)
}
