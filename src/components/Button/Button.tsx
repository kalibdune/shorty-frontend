import React from 'react'
import './Button.scss'

interface ButtonProps {
	className?: string
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
	className = '',
	type = 'button',
	onClick,
	children,
}) => {
	return (
		<button className={`button ${className}`} type={type} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
