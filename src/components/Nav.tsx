import React from 'react'
import '../index.scss'
import { Link } from 'react-router-dom'

const Main: React.FC = () => {
	return (
		<nav className='nav'>
			<Link to={{ pathname: '/login' }}>Мои ссылки</Link>
		</nav>
	)
}

export default Main
