import React, { useEffect } from 'react'
import './popup.scss'

interface PopupProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('popup-open')
		}
		return () => {
			document.body.classList.remove('popup-open')
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className='popup-overlay' onClick={onClose}>
			<div className='popup-content' onClick={(e) => e.stopPropagation()}>
				<button className='popup-close' onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	)
}

export default Popup
export type { PopupProps }
