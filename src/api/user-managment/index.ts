import { request } from 'api/request'

export const getAdmins = <T>(params: T) => request('api/dior/admins', { params })
export const postAdmins = <T>(data: T) => request.post('api/dior/admins', data)
export const putAdmins = <T>(data: T, id?: number) => request.put(`api/dior/admins/${id}`, data)
