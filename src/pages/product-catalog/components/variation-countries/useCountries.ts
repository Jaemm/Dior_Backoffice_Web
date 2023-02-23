import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { useProductCatalogStore } from 'store/product-catalog'

export const useCountries = () => {
	const { countries, setCountries, editVariation } = useProductCatalogStore(state => ({
		countries: state.countries,
		setCountries: state.setCountries,
		editVariation: state.editVariation,
	}))

	const { isLoading, isFetching } = useQuery(['all-countries'], getCountries, {
		select: data => {
			const options = data.data.data.map((v: any) => ({ label: v.name, value: v.name }))
			return { ...data.data, data: options }
		},
		onSuccess: data => {
			const all = data.data.every((c: any) => editVariation.values?.countries?.includes(c.label))
			const newCountries = [{ label: 'All', value: '' }, ...data.data]
				.map((v: any) => ({
					...v,
					value:
						v.label === 'All'
							? all
							: !!editVariation.values?.countries?.find((a: any) => a === v.label),
				}))
				.map(g => ({
					label: g.label,
					value: countries.find(s => s.label === g.label)?.value
						? countries.find(s => s.label === g.label)?.value
						: g.value,
				}))

			setCountries(newCountries)
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		keepPreviousData: true,
	})

	return { countries, isLoading, isFetching, setCountries }
}
