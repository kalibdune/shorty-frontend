import Main from '../pages/Main/Main'
import { Auth } from '../pages/Auth/Auth'
import Nav from '../components/Nav/Nav'
import Background from '../components/Background/Background'
import { Routes, Route } from 'react-router-dom'
import '../index.scss'

const App: React.FC = () => {
	return (
		<>
			<Nav></Nav>
			<Background></Background>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</>
	)
}

export default App
