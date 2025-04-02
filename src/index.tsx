import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Main from './pages/Main/Main'
import { Auth } from './pages/Auth/Auth'
import Nav from './components/Nav'
import Background from './components/Background'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)
root.render(
	<StrictMode>
		<Nav></Nav>
		<Background></Background>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
