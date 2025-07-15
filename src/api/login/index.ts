import { request } from 'api/request'
import { FormForgetTypes } from 'types/login'

export const loginUser = () => {
	return request.get('/consultants/login/saml')
}

export const forgetPassword = (data: FormForgetTypes) => {
	return request.post('partnerdb/consultants/password', {
		...data,
		app_id: '88',
	})
}

