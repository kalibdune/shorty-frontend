import React, { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import StorageService from '../../utils/storage'
import Nav from '../../components/Nav/Nav'
import { ApiService } from '../../utils/api'
import { UserCreateRequest } from '../../types/api'

export const Auth: React.FC = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	})
	const [logged, setLogged] = useState(false)
	const [isRegisterMode, setIsRegisterMode] = useState(true)
	const navigator = useNavigate()
	const storage = new StorageService()
	const api = new ApiService()

	useEffect(() => {
		const l = storage.getItem<boolean>('isLogged')
		console.log('Auth', l)
		setLogged(l ? true : false)
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!isRegisterMode) {
			api.login(formData.email, formData.password).then((answer) => {
				storage.setItem('user', answer)
				storage.setItem('isLogged', true)
				setLogged(true)
				navigator('/')
			})
		} else {
			const payload: UserCreateRequest = {
				email: formData.email,
				password: formData.password,
				name: formData.name,
			}
			api.createUser(payload).then((answer) => {
				storage.setItem('isLogged', true)
				storage.setItem('user', answer)
				setLogged(true)
				navigator('/')
			})
		}
	}

	const toggleMode = () => {
		setIsRegisterMode(!isRegisterMode)
	}

	return (
		<>
			<Nav></Nav>
			<div className='container'>
				<form onSubmit={handleSubmit} className='container'>
					{isRegisterMode && (
						<div className='input-container'>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								required
								className='input-box'
								placeholder='Имя пользователя'
							/>
						</div>
					)}
					<div className='input-container'>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							required
							className='input-box'
							placeholder='Почта'
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
							placeholder='Пароль'
						/>
					</div>
					<Button type={'submit'} className={'button-medium'}>
						{isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
					</Button>
					<a onClick={toggleMode} className='a-regular'>
						{isRegisterMode
							? 'Уже есть аккаунт? Войти'
							: 'Нет аккаунта? Зарегистрироваться'}
					</a>
				</form>
			</div>
		</>
	)
}
