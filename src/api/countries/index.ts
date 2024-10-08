import { request } from 'api/request'

export const getCountries = <T>(params: T) => request('dior/countries', { params })

export const postCountries = <T>(data: T) => request.post('dior/countries', data)

export const putCountries = <T>(data: T, id?: number) => request.put(`dior/countries/${id}`, data)
