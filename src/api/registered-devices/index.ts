import { request } from 'api/request'

export const getRegistered = <T>(params: T, signal?: AbortSignal) =>
	request('/dior/devices', {
		params,
		signal,
	})
export const resetDevice = ({ id }: { id: number }) =>
	request.post('/dior/devices/connect-reset', { device_id: id })
