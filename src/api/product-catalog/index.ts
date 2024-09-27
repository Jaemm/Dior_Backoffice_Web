import { request } from 'api/request'
import axios from 'axios'

export const getProductCatalog = <T>(params: T) =>
	request('api/dior/product_recommendations', {
		params,
	})

export const postProductCatalog = <T>(data: T) =>
	request.post('api/dior/product_recommendations', data)

export const pustProductCatalog = <T>(data: T, id?: number) =>
	request.put(`api/dior/product_recommendations/${id}`, data)

export const getCollection = () => request('api/dior/product_recommendations/get_collection')
export const getCategory = () => request('api/dior/product_recommendations/get_category')

interface IUpload {
	filename: string
}

export const uploadImage = ({ filename }: IUpload) =>
	request('api/pmx/product_recommendations/presign_upload', {
		params: {
			filename,
		},
	})

interface IUrl {
	url: string
	file: string
}

export const uploadUrl = ({ url, file }: IUrl) => axios.put(url, file, {})
