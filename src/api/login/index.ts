import { request } from 'api/request'
import { FormTypes, FormForgetTypes } from 'types/login'

export const loginUser = (data: FormTypes) =>
	request.post('api/partnerdb/consultants/login', data, {
		headers: {
			'X-CHOWIS-LOCALE': 'ko',
		},
	})

export const forgetPassword = (data: FormForgetTypes) =>
	request.post('api/partnerdb/consultants/password', data)
