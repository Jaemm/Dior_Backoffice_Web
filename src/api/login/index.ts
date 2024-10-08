import { request } from 'api/request'
import { FormTypes, FormForgetTypes } from 'types/login'

export const loginUser = (data: FormTypes) => {
	const requestData = {
		...data,
		app_id: '88',
	}
	return request.post('partnerdb/consultants/dior_login', requestData, {
		headers: {
			'X-CHOWIS-LOCALE': 'ko',
		},
	})
}

export const forgetPassword = (data: FormForgetTypes) => {
	const requestData = {
		...data,
		app_id: '88',
	}
	return request.post('partnerdb/consultants/password', requestData)
}
