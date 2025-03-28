import axios, { AxiosInstance } from 'axios'
import { API_URL } from './constants'

interface Url {
	url: string
	hash: string
	expired_at: Date
	user_id: string
	id: string
	created_at: string
	updated_at: string
}

export class ApiService {
	private API_URL: string
	private axios: AxiosInstance

	constructor() {
		this.API_URL = API_URL
		this.axios = axios.create({ baseURL: this.API_URL })
	}

	public createShortUrl = async (
		url: string,
		expirationTime?: number
	): Promise<Url> => {
		expirationTime = expirationTime ?? 86400

		const payload = JSON.stringify({
			url: url,
			user_id: null,
			expiration_time: expirationTime,
		})

		const response = await this.axios.post<Url>(
			`${this.API_URL}/url/`,
			payload,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		return response.data
	}
}
