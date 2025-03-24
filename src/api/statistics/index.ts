import { request } from 'api/request'

export const getStatisticsOverall = () => request('dior/statistics/overall')

export const getStatistic = (type?: string, signal?: AbortSignal) =>
	request('dior/statistics/stat_details', {
		params: {
			stat_type: type,
		},
		signal,
	})
