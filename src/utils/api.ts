import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from './constants'
import { ExpOpts } from '../types/enums'
import {
	AuthResponse,
	UrlCreateRequest,
	UrlResponse,
	UserCreateRequest,
	UserResponse,
} from '../types/api'

export class ApiService {
	private axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: BASE_URL,
			withCredentials: true,
		})
	}

	private async request<T>(
		endpoint: string,
		method: string = 'GET',
		data?: any
	): Promise<T> {
		try {
			const response = await this.axiosInstance.request<T>({
				url: endpoint,
				method,
				data,
			})
			return response.data
		} catch (error: any) {
			throw new Error(error.response?.data?.message || error.message)
		}
	}

	async createShortUrl(payload: UrlCreateRequest): Promise<UrlResponse> {
		return this.request<UrlResponse>('/api/url/', 'POST', payload)
	}

	async getUrlsByUser(
		userId: string,
		page: number = 1,
		size: number = 10
	): Promise<UrlResponse[]> {
		return this.request<UrlResponse[]>(
			`/api/url/${userId}/?page=${page}&size=${size}`,
			'GET'
		)
	}

	async updateUrl(
		id: string,
		payload: Partial<UrlCreateRequest>
	): Promise<UrlResponse> {
		return this.request<UrlResponse>(`/api/url/${id}/`, 'PATCH', payload)
	}

	async getUrlByHash(hash: string): Promise<UrlResponse> {
		return this.request<UrlResponse>(`/api/url/${hash}/`, 'GET')
	}

	async createUser(payload: UserCreateRequest): Promise<UserResponse> {
		return this.request<UserResponse>('/api/user/', 'POST', payload)
	}

	async getUserById(id: string): Promise<UserResponse> {
		return this.request<UserResponse>(`/api/user/${id}/`, 'GET')
	}

	async login(username: string, password: string): Promise<AuthResponse> {
		const payload = new URLSearchParams()
		payload.append('username', username)
		payload.append('password', password)
		payload.append('grant_type', 'password')

		return this.request<AuthResponse>('/api/token/', 'POST', payload)
	}

	async refreshToken(): Promise<AuthResponse> {
		return this.request<AuthResponse>('/api/token/refresh/', 'POST')
	}

	async revokeTokens(): Promise<void> {
		return this.request<void>('/api/token/revoke/', 'POST')
	}
}

export const getExpField = (
	expirationTime: ExpOpts,
	customTime: string
): Date | null => {
	let exp: Date | null = null
	if (expirationTime == ExpOpts.Day) {
		exp = new Date(Date.now() + 86400 * 1000)
	} else if (expirationTime == ExpOpts.Week) {
		exp = new Date(Date.now() + 604800 * 1000)
	} else if (expirationTime == ExpOpts.Custom && customTime !== '') {
		let [day, month, year] = customTime.split('.').map(Number)
		exp = new Date(Date.UTC(year, month - 1, day))
	} else {
		exp = null
	}
	return exp
}
