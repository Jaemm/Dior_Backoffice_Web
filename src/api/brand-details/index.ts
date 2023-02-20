import { request } from 'api/request'

export const getBranchCompanies = <T>(params: T) =>
	request('api/dior/company_branches', {
		params,
	})

export const addPos = <T>(data: T) => request.post('api/dior/company_branches', data)

export const updatePos = <T>(data: T, id: number | undefined) =>
	request.put(`api/dior/company_branches/${id}`, data)
