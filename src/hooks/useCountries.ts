import { useQuery } from '@tanstack/react-query'
import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'

export const useCountries = () => {
	const { data = { countries: [], options: [] }, isLoading } = useQuery(
		['all-countries'],
		getCountries,
		{
			select: data => {
				const options = data.data.data.map((v: any) => ({ label: v.name, value: v.name }))
				const countries = [{ label: 'All', value: '' }, ...options]
				return { ...data.data, countries, options }
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)

	return { options: data.options, countries: data.countries, isLoading }
}
