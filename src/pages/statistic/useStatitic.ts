import { useParams } from 'react-router-dom'
import { getStatistic } from 'api/statistics'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getCountries } from 'api/countries'
import Statistic from './page'

export const useStatitic = () => {
	const { typeOfStatistic } = useParams()

	const search = ''

	const {
		data: market = { data: [] },
		isLoading: isLoadingMarket,
		isFetching,
	} = useQuery(['all-countries', search], () => getCountries({ search }), {
		select: data => {
			return data.data
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		keepPreviousData: true,
	})

	const { data = { data: { data: [], total_count: 0 } }, isLoading } = useQuery(
		['statistic', typeOfStatistic],
		({ signal }) => getStatistic(typeOfStatistic, signal),
		{
			select: res => {
				const countries = Object.entries(res.data.data).map(([name, total]: any) => {
					const result =
						typeOfStatistic === 'devices' && name !== 'unknown_country'
							? market.data.find((e: any) => e.code === name)
							: []

					const rename = typeOfStatistic === 'devices' ? result.name : name
					return {
						name:
							name === 'unknown_country' || name === undefined
								? 'Country Not Disclosed'
								: rename[0].toUpperCase() + rename.slice(1),
						total,
					}
				})
				const newData = { data: countries, total_count: res.data.total_count }
				return { ...res, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	return {
		isLoading,
		data: data.data.data,
		total: data.data.total_count,
	}
}
