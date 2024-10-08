import { request } from 'api/request'
import axios from 'axios'

export const uploadFile = (formData: FormData) =>
	request.post('dior/company_branches/presign_upload_import_file', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

export const filePut = ({ url, file }: { url: string; file: File }) => axios.put(url, file)

interface ISave {
	type: string
	file_url: string
	importDior?: string
	country?: string
}
export const saveFile = ({ type, file_url, country, importDior }: ISave) => {
	file_url = 'https://' + file_url

	return request.post(`dior/${type}/${importDior}`, { file_url, country })
}
export const saveFileImages = ({ file_url }: any) => {
	file_url = 'https://' + file_url
	return request.post('dior/product_recommendations/import_pictures', { file_url })
}
