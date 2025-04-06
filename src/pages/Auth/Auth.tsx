import React, { useState } from 'react'

export const Auth: React.FC = () => {
	const [isRegister, setIsRegister] = useState(false)
	const [formData, setFormData] = useState({ email: '', password: '' })

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (isRegister) {
			console.log('Registering:', formData)
		} else {
			console.log('Logging in:', formData)
		}
	}

	return <h1>Hello</h1>
}
