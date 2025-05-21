import React, { useState, useRef } from 'react'
import InputSection from '../../components/InputSection/InputSection'
import './Main.scss'
import Nav from '../../components/Nav/Nav'
import QRCode from '../../components/QRCode/QRCode'

const Main: React.FC = () => {
	const [url, setUrl] = useState('Shorty')
	const [visibilityQR, setVisibilityQR] = useState(false)
	const titleRef = useRef<HTMLInputElement>(null)

	const setTitleUrl = (resUrl: string): void => {
		titleRef.current?.classList.add('title-url')
		setUrl(resUrl)
		navigator.clipboard.writeText(resUrl)
	}

	return (
		<>
			<Nav></Nav>
			<div className='container main-container'>
				<header>
					<p ref={titleRef} className='title'>
						{url}
					</p>
				</header>
				<QRCode url={url} visibility={visibilityQR}></QRCode>
				<InputSection setTitle={setTitleUrl} setVisibility={setVisibilityQR} />
			</div>
		</>
	)
}

export default Main
