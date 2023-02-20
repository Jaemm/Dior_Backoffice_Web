import { request } from 'api/request'

export const getAttributes = <T>(params: T) => request('api/dior/product_attributes', { params })
export const postAttributes = <T>(data: T) => request.post('api/dior/product_attributes', data)
export const putAttributes = <T>(data: T, id?: number) =>
	request.put(`api/dior/product_attributes/${id}`, data)
