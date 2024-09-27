import { request } from 'api/request'

export const getRegistered = <T>(params: T) =>
	request('api/dior/devices', {
		params,
	})
export const resetDevice = ({ id }: { id: number }) =>
	request.post('/api/dior/devices/connect-reset', { device_id: id })
