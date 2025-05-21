import React from 'react'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
	...etc
}) => {
	return (
		<button
			className={`button ${className}`}
			type={type}
			onClick={onClick}
			{...etc}
		>
			{children}
		</button>
	)
}

export default Button
