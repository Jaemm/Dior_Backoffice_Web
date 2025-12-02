import { request } from 'api/request'

export const getProductLogs = <T>(params: T, signal?: AbortSignal) =>
	request('product-logs', { params, signal })

export const exportProductLogs = () => request('product-logs/export', { responseType: 'blob' })
