import React from 'react'
import './Nav.scss'
import { Link } from 'react-router-dom'

const Main: React.FC = () => {
	const logged = false
	return (
		<nav className='nav'>
			<Link to={{ pathname: logged ? '/urls' : '/auth' }}>Мои ссылки</Link>
		</nav>
	)
}

export default Main
