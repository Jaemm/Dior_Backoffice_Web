import { useEffect } from 'react'
import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useToggle } from 'hooks/useToggle'
import { postCountries, putCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface FormTypes {
	code: string
	name: string
	default_recommendation: string
}

export const defaultValues = {
	code: '',
	name: '',
	default_recommendation: '',
}

export type IValue = {
	code: string
	default_recommendation: string
	id: number
	name: string
	url_and_port: string
}

export const optionsRecommendation = [
	{ label: 'Recommendation Europe', value: 'Recommendation Europe' },
	{ label: 'Recommendation Asia', value: 'Recommendation Asia' },
	{ label: 'Recommendation Japan', value: 'Recommendation Japan' },
]

export const useMarketForm = (values?: IValue, type?: string) => {
	const queryClient = useQueryClient()
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		if (type === 'edit') {
			form.reset({
				code: values?.code,
				name: values?.name,
				default_recommendation: values?.default_recommendation,
			})
		}
	}, [open])

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['all-countries'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const handleClose = () => {
		setToggle(false)
		form.reset(defaultValues)
	}

	const resAdd = useMutation((data: FormTypes) => postCountries<FormTypes>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const resUpdate = useMutation((data: FormTypes) => putCountries<FormTypes>(data, values?.id), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const onSubmit = (data: FormTypes) => {
		if (type === 'edit') {
			resUpdate.mutate(data)
		} else {
			resAdd.mutate(data)
		}
	}

	return { open, form, resAdd, toggle, resUpdate, onSubmit, handleClose }
}
