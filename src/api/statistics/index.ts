import { request } from 'api/request'

export const getStatisticsOverall = () => request('api/dior/statistics/overall')

export const getStatistic = (type?: string) =>
	request('api/dior/statistics/stat_details', {
		params: {
			stat_type: type,
		},
	})
