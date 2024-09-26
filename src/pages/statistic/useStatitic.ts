import { useParams } from 'react-router-dom'
import { getStatistic } from 'api/statistics'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getCountries } from 'api/countries'

export const useStatitic = () => {
	const { typeOfStatistic } = useParams()
	const { data = { data: { data: [], total_count: 0 } }, isLoading } = useQuery(
		['statistic', typeOfStatistic],
		() => getStatistic(typeOfStatistic),
		{
			select: res => {
				if (typeOfStatistic === 'stores') {
					const countries = Object.entries(res.data.data).map(([name, total]: any) => ({
						name: name === 'unknown_country' ? 'Country Not Disclosed' : name,
						total: total.count_all,
					}))
					const newData = { data: countries, total_count: res.data.total_count }
					return { ...res, data: newData }
				} else {
					const countries = Object.entries(res.data.data).map(([name, total]) => ({
						name: name === 'unknown_country' ? 'Country Not Disclosed' : name,
						total,
					}))
					const newData = { data: countries, total_count: res.data.total_count }
					return { ...res, data: newData }
				}
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	// const devicesData = data.data.data
	// 	.map(({ name, total }) => {
	// 		const matchedCountry = resCountry.data.data.find((value: any) => value.code === name)
	// 		return matchedCountry
	// 			? { name: matchedCountry.cName, total }
	// 			: { name: 'Country Not Disclosed', total }
	// 	})
	// 	.filter(Boolean)

	const statCount = data.data.data
	return { isLoading, data: statCount, total: data.data.total_count }
}
