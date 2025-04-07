import React, { useEffect, useState } from 'react'
import './Nav.scss'
import { Link, useLocation } from 'react-router-dom'
import StorageService from '../../utils/storage'
import { ApiService } from '../../utils/api'

const Nav: React.FC = () => {
	const [logged, setLogged] = useState(false)
	const storage = new StorageService()
	const api = new ApiService()
	const location = useLocation()

	useEffect(() => {
		const l = storage.getItem<boolean>('isLogged')
		setLogged(l ? true : false)
	}, [])

	const logOut = () => {
		api.logout().then(() => {
			setLogged(false)
			storage.removeItem('user')
			storage.setItem('isLogged', false)
		})
	}

	console.log(location.pathname)

	return (
		<nav className='nav'>
			{location.pathname !== '/profile' && (
				<Link to={{ pathname: '/profile' }} className='nav-link'>
					Профиль
				</Link>
			)}
			{location.pathname !== '/urls' && (
				<Link to={{ pathname: '/urls' }} className='nav-link'>
					Мои ссылки
				</Link>
			)}
			{location.pathname !== '/' && (
				<Link to={{ pathname: '/' }} className='nav-link'>
					Shorty
				</Link>
			)}
			{logged ? (
				<a className='nav-link' onClick={logOut}>
					Выйти
				</a>
			) : (
				<Link to={{ pathname: '/auth' }} className='nav-link'>
					Войти
				</Link>
			)}
		</nav>
	)
}

export default Nav
