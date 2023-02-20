import { request } from 'api/request'

export const getRegistered = <T>(params: T) =>
	request('api/dior/devices', {
		params,
	})
