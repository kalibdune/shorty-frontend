if (!process.env.API_URL) {
	throw new Error('Environment variable API_URL is not defined')
}

if (!process.env.BASE_URL) {
	throw new Error('Environment variable BASE_URL is not defined')
}

const API_URL: string = process.env.API_URL
const BASE_URL: string = process.env.BASE_URL
export { API_URL, BASE_URL }
