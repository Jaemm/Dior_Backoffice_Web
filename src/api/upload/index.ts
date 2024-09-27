import { request } from 'api/request'
import axios from 'axios'

export const uploadFile = (filename: string) =>
	request('api/dior/company_branches/presign_upload_import_file', {
		params: {
			filename,
		},
	})

export const filePut = ({ url, file }: { url: string; file: string }) => axios.put(url, file)

interface ISave {
	type: string
	file_url: string
	importDior?: string
	country?: string
}
export const saveFile = ({ type, file_url, country, importDior }: ISave) =>
	request.post(`api/dior/${type}/${importDior}`, { file_url, country })

export const saveFileImages = ({ file_urls }: any) =>
	request.post('api/dior/product_recommendations/import_pictures', { file_urls })
