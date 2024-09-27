import { request } from 'api/request'

export const getCountries = <T>(params: T) => request('api/dior/countries', { params })

export const postCountries = <T>(data: T) => request.post('api/dior/countries', data)

export const putCountries = <T>(data: T, id?: number) =>
	request.put(`api/dior/countries/${id}`, data)
