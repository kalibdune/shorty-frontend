const getRandomPlaceholderDay = (): string => {
	const randomDays = Math.floor(Math.random() * 30) + 1
	const randomMonths = Math.floor(Math.random() * 12)
	const randomDate = new Date()
	randomDate.setDate(randomDate.getDate() + randomDays)
	randomDate.setMonth(randomDate.getMonth() + randomMonths)
	return randomDate.toLocaleDateString('ru-RU')
}

export { getRandomPlaceholderDay }
