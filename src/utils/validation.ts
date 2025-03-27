const validateUrl = (url: string): boolean => {
	url = url.trim()
	const urlRegex =
		/^(?:https?|ftp|sftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
	return urlRegex.test(url)
}

const validateDate = (date: string): boolean => {
	const [day, month, year] = date.split('.').map(Number)
	if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
		return false
	}
	const testDate = new Date(year, month - 1, day)
	const currentDate = new Date()
	return (
		testDate.getFullYear() === year &&
		testDate.getMonth() === month - 1 &&
		testDate.getDate() === day &&
		testDate > currentDate
	)
}

export { validateDate, validateUrl }
