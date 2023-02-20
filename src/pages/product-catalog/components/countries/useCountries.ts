import { useQuery } from '@tanstack/react-query'
import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const useCountries = () => {
	const form = useFormContext()
	const [allCountries, setAllCountries] = useState<any[]>([])
	const { isLoading, isFetching } = useQuery(['all-countries'], getCountries, {
		select: data => {
			const options = data.data.data.map((v: any) => ({ label: v.name, value: v.name }))
			return { ...data.data, data: options }
		},
		onSuccess: data => {
			const all = data.data.every((c: any) => form.getValues('countries').includes(c.label))
			const newCountries = [{ label: 'All', value: '' }, ...data.data].map((v: any) => ({
				...v,
				value:
					v.label === 'All' ? all : !!form.getValues('countries')?.find((a: any) => a === v.label),
			}))
			setAllCountries(newCountries)
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		keepPreviousData: true,
	})

	return { isLoading, isFetching, allCountries, setAllCountries }
}
