import { request } from 'api/request'

import { getUser } from 'utils/getUser'
type UserType = 'Brand Manager' | 'Super Admin' | 'Admin'

const { user } = getUser()
const role_id: { [key in UserType]: number } = {
	'Brand Manager': 4,
	'Super Admin': 5,
	Admin: 6,
}
const userType = user.user_type as UserType
export const getAdmins = <T>(params: T, signal?: AbortSignal) =>
	request('dior/admins', { params, signal })
export const postAdmins = <T>(data: T) => {
	const requestData = {
		...data,
		consultant_position_id: role_id[userType],
	}
	return request.post('dior/admins', requestData)
}
export const putAdmins = <T>(data: T, id?: number) => request.put(`dior/admins/${id}`, data)
