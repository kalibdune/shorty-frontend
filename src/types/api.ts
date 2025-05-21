export interface UrlCreateRequest {
	url: string
	expiration_time?: Date | null
}

export interface UrlUpdateRequest {
	url: string
	expired_at?: Date | null
}

export interface UrlResponse {
	url: string
	hash: string
	expired_at: string | null
	user_id: string | null
	id: string
	created_at: string
	updated_at: string
}

export interface UrlPaginatedResponse {
	urls: UrlResponse[]
	total_count: number
}

export interface UrlRedirectRequest {
	started_at: Date
	ended_at: Date
}

export interface UrlRedirect {
	url_id: string
	id: string
	created_at: string
	updated_at: string
}

export interface UrlRedirectStatistic {
	url_redirections: UrlRedirect[]
	count: number
}

export interface UserCreateRequest {
	name: string
	email: string
	password: string
}

export interface UserUpdateRequest {
	name?: string | null
	email?: string | null
}

export interface UserResponse {
	name: string
	email: string
	id: string
	created_at: string
	updated_at: string
}

export interface RevokedTokensResponse {
	revoked_count: number
}
