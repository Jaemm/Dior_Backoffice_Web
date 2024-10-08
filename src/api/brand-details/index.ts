import { request } from 'api/request'

export const getBranchCompanies = <T>(params: T) =>
	request('dior/company_branches', {
		params,
	})

export const addPos = <T>(data: T) => request.post('dior/company_branches', data)

export const updatePos = <T>(data: T, id: number | undefined) =>
	request.put(`dior/company_branches/${id}`, data)
