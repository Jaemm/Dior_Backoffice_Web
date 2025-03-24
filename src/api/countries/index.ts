import { request } from 'api/request'

export const getCountries = <T>(params: T, signal?: AbortSignal) =>
	request('dior/countries', { params, signal })

export const postCountries = <T>(data: T) => request.post('dior/countries', data)

export const putCountries = <T>(data: T, id?: number) => request.put(`dior/countries/${id}`, data)
