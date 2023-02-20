import { useState } from 'react'
import { schema } from './form.schema'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { notifyError } from 'components/notify'
import { getProductCatalog } from 'api/product-catalog'

export interface FormTypes {
	filter_by_country: string
}

interface IParams {
	filter_by_country: string
}

export const defaultValues = {
	filter_by_country: '',
}

export const useCountriesForm = () => {
	const [dataWithCountry, setDataWithCountry] = useState<any[]>([])

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const country = useWatch({ name: 'filter_by_country', control: form.control })

	const { mutate, isLoading } = useMutation((e: IParams) => getProductCatalog<IParams>(e), {
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		onSuccess: data => {
			const newData = data.data.data.map((v: any) => ({
				'Product Code': v.code,
				Exclusion: v.countries.includes(form.getValues('filter_by_country')) ? 'N' : 'Y',
			}))
			setDataWithCountry(newData)
		},
	})

	return { form, mutate, country, isLoading, dataWithCountry, setDataWithCountry }
}
