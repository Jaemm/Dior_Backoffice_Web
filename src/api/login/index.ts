import { request } from 'api/request'
import { CredentialsFormTypes, FormForgetTypes } from 'types/login'

export const loginUser = (data: CredentialsFormTypes) => {
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
	return request.post('partnerdb/consultants/password', {
		...data,
		app_id: '88',
	})
}
