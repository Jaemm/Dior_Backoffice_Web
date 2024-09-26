import { request } from 'api/request'

export const getStatisticsOverall = () => request('dior/statistics/overall')

export const getStatistic = (type?: string) =>
	request('dior/statistics/stat_details', {
		params: {
			stat_type: type,
		},
	})
