export interface ApiResponseType<T> {
    message: string
    data: T
}

export interface ApiErrorType{
    status: number
    timestamp: string
    message: string
    details: string[] | null
}

export interface PageResponseType<T> {
    content: T[]
    totalPages: number
    totalElements: number
    number: number
    size: number
}