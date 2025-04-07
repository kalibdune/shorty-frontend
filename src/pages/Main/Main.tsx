import React, { useState, useRef } from 'react'
import Input from './InputSection'
import './Main.scss'
import Nav from '../../components/Nav/Nav'

const Main: React.FC = () => {
	const [url, setUrl] = useState('Shorty')
	const titleRef = useRef<HTMLInputElement>(null)

	const setTitleUrl = (resUrl: string): void => {
		titleRef.current?.classList.add('title-url')
		setUrl(resUrl)
		navigator.clipboard.writeText(resUrl)
	}

	return (
		<>
			<Nav></Nav>
			<div className='container'>
				<header>
					<p ref={titleRef} className='title'>
						{url}
					</p>
				</header>
				<Input setTitle={setTitleUrl}></Input>
			</div>
		</>
	)
}

export default Main
