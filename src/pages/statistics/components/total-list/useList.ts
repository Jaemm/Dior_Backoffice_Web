import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getStatisticsOverall } from 'api/statistics'

export const useList = () => {
	const {
		data = {
			consultation_time: 0,
			total_analysis: 0,
			total_branches: 0,
			total_clients: 0,
			total_consultations: 0,
			total_devices: 0,
		},
		isLoading,
	} = useQuery(['statistics-soverall'], getStatisticsOverall, {
		select: data => {
			return data.data
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	return { data, isLoading }
}
