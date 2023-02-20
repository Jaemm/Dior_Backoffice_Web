import { useQuery } from '@tanstack/react-query'
import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const useTranslation = () => {
	const form = useFormContext()
	const [allTranslation, setAllTranslation] = useState<any[]>([])

	const { isLoading, isFetching } = useQuery(['all-countries'], getCountries, {
		select: data => {
			const options = data.data.data.map((v: any) => ({
				field_name: 'product_name',
				language: v.name,
				value: '',
			}))
			return { ...data.data, data: options }
		},
		onSuccess: data => {
			const newAllTranslation = data.data.map((v: any) => ({
				...v,
				value:
					form.getValues('product_translations')?.find((a: any) => a.language === v.language)
						?.value ?? '',
			}))
			setAllTranslation(newAllTranslation)
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		keepPreviousData: true,
	})

	return { isLoading, isFetching, allTranslation, setAllTranslation }
}
