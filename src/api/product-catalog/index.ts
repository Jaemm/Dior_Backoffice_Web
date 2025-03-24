import { request } from 'api/request'
import axios from 'axios'

export const getProductCatalog = <T>(params: T, signal?: AbortSignal) =>
	request('dior/product_recommendations', {
		params,
		signal,
	})

export const postProductCatalog = <T>(data: T) => request.post('dior/product_recommendations', data)

export const pustProductCatalog = <T>(data: T, id?: number) =>
	request.put(`dior/product_recommendations/${id}`, data)

export const getCollection = () => request('dior/product_recommendations/get_collection')
export const getCategory = () => request('dior/product_recommendations/get_category')

interface IUpload {
	filename: string
}

export const uploadImage = (formData: FormData) =>
	request.post('dior/product_recommendations/presign_upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

interface IUrl {
	url: string
	file: File | undefined
}

export const uploadUrl = ({ url, file }: IUrl) => axios.put(url, file, {})
