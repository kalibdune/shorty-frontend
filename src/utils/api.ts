import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from './constants'
import { ExpOpts } from '../types/enums'
import {
	UrlCreateRequest,
	UrlPaginatedResponse,
	UrlRedirectRequest,
	UrlRedirectStatistic,
	UrlResponse,
	UrlUpdateRequest,
	UserCreateRequest,
	UserResponse,
	UserUpdateRequest,
	RevokedTokensResponse
} from '../types/api'

export class ApiService {
	private axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: BASE_URL,
			withCredentials: true,
		})
	}

	private async requestToAPI<T>(
		endpoint: string,
		method: string = 'GET',
		data?: any
	): Promise<T> {
		const response = await this.axiosInstance.request<T>({
			url: endpoint,
			method,
			data,
		})
		return response.data
	}

	private async request<T>(
		endpoint: string,
		method: string = 'GET',
		data?: any
	): Promise<T> {
		console.log("request")
		try {
			return await this.requestToAPI<T>(endpoint, method, data)
		} catch (error: unknown) {
			console.log("error caught in request")
			if (axios.isAxiosError(error)) {
				console.error("axios error", error.response?.status, error.message)
				if (error.response?.status === 401) {
					try {
						await this.requestToAPI<void>('/api/token/refresh/', 'POST')
						console.info("refresh endpoint done")
						return await this.requestToAPI<T>(endpoint, method, data)
					} catch (refreshError) {
						console.error("refresh token error", refreshError)
						throw new Error('Failed to refresh token')
					}
				}
				throw new Error(error.message)
			}
			console.error("unexpected error", error)
			throw new Error('An unexpected error occurred')
		}
	}

	async createShortUrl(payload: UrlCreateRequest): Promise<UrlResponse> {
		return this.request<UrlResponse>('/api/url/', 'POST', payload)
	}

	async getUrlsByUser(
		userId: string,
		page: number = 1,
		size: number = 10
	): Promise<UrlPaginatedResponse> {
		return this.request<UrlPaginatedResponse>(
			`/api/url/user/${userId}/?page=${page}&size=${size}`,
			'GET'
		)
	}

	async getUrlByHash(hash: string): Promise<UrlResponse> {
		return this.request<UrlResponse>(`/api/url/${hash}/`, 'GET')
	}

	async getUrlStatistic(
		urlId: string,
		payload: UrlRedirectRequest
	): Promise<UrlRedirectStatistic> {
		return this.request<UrlRedirectStatistic>(
			`/api/url/statistic/${urlId}`,
			'POST',
			payload
		)
	}

	async updateUrlById(id: string, payload: UrlUpdateRequest): Promise<UrlResponse> {
		return this.request<UrlResponse>(`/api/url/${id}/`, 'PUT', payload)
	}

	async createUser(payload: UserCreateRequest): Promise<UserResponse> {
		return this.request<UserResponse>('/api/user/', 'POST', payload)
	}

	async getUserById(id: string): Promise<UserResponse> {
		return this.request<UserResponse>(`/api/user/${id}/`, 'GET')
	}

	async updateUser(
		id: string,
		payload: UserUpdateRequest
	): Promise<UserResponse> {
		return this.request<UserResponse>(`/api/user/${id}/`, 'PATCH', payload)
	}

	async login(email: string, password: string): Promise<UserResponse> {
		const payload = new URLSearchParams()
		payload.append('username', email)
		payload.append('password', password)
		payload.append('grant_type', 'password')

		return this.request<UserResponse>('/api/token/', 'POST', payload)
	}

	async refreshToken(): Promise<void> {
		return this.request<void>('/api/token/refresh/', 'POST')
	}

	async revokeTokens(): Promise<RevokedTokensResponse> {
		return this.request<RevokedTokensResponse>('/api/token/revoke/', 'DELETE')
	}

	async logout(): Promise<void> {
		return this.request<void>('/api/token/logout/', 'DELETE')
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