import { request } from 'api/request'

export const getRegistered = <T>(params: T) =>
	request('dior/devices', {
		params,
	})
export const resetDevice = ({ id }: { id: number }) =>
	request.post('dior/devices/connect-reset', { device_id: id })
