import { request } from 'api/request'

export const getBeautyConsultants = <T>(params: T, signal?: AbortSignal) =>
	request('dior/company_consultants', {
		params,
		signal,
	})

export const postBeautyConsultants = <T>(data: T) => request.post('dior/company_consultants', data)

export const getAssignedCustomers = <T>(params: T, id?: string, signal?: AbortSignal) =>
	request(`partnerdb/consultants/${id}/customers`, {
		params,
		signal,
	})

export const getBeautyConsultantsDetail = (id?: string, signal?: AbortSignal) =>
	request(`partnerdb/consultants/${id}`, {
		signal,
	})

export const getCustomer = (id?: string) => request(`partnerdb/customers/${id}`)

export const getBeautyHistory = <T>(params: T, id?: string, signal?: AbortSignal) =>
	request(`partnerdb/customers/${id}/analysis_histories`, {
		params,
		signal,
	})
interface IMoisture {
	batch_id?: string
	customer_id?: string
	analysis_type?: string
}
export const getMoisture = (
	{ batch_id, customer_id, analysis_type }: IMoisture,
	signal?: AbortSignal,
) =>
	request(
		`partnerdb/customers/${customer_id}/analysis_histories/${batch_id}/hydration_sebum?analysis_type=${analysis_type}`,
		{
			signal,
		},
	)

export const getResult = (
	{ batch_id, customer_id, analysis_type }: IMoisture,
	signal?: AbortSignal,
) =>
	request(
		`partnerdb/customers/${customer_id}/analysis_histories/${batch_id}?analysis_type=${analysis_type}&batch_id=${batch_id}`,
		{
			signal,
		},
	)
