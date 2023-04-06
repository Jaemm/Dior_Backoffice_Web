import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { usePermission } from './usePermission'
import { useQuery } from '@tanstack/react-query'

export const useCountries = () => {
	const { user, isSimpleAdmin } = usePermission()
	const { data = { countries: [], options: [] }, isLoading } = useQuery(
		['all-countries'],
		getCountries,
		{
			select: data => {
				const options =
					isSimpleAdmin && user.countries.length > 0
						? data.data.data
								.map((v: any) => ({ label: v.name, value: v.name }))
								.filter((option: any) => user.countries.includes(option.label))
						: data.data.data.map((v: any) => ({ label: v.name, value: v.name }))
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
