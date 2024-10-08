import { useParams } from 'react-router-dom'
import { getStatistic } from 'api/statistics'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'

export const useStatitic = () => {
	const { typeOfStatistic } = useParams()
	const { data = { data: { data: [], total_count: 0 } }, isLoading } = useQuery(
		['statistic', typeOfStatistic],
		() => getStatistic(typeOfStatistic),
		{
			select: res => {
				const countries = Object.entries(res.data.data).map(([name, total]: any) => ({
					name: name === 'unknown_country' ? 'Country Not Disclosed' : name,
					total: typeOfStatistic === 'stores' ? total.count_all : total,
				}))
				const newData = { data: countries, total_count: res.data.total_count }
				return { ...res, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	return { isLoading, data: data.data.data, total: data.data.total_count }
}
