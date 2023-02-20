import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useToggle } from 'hooks/useToggle'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { DataRowProductCatalog } from 'types/product-catalog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postProductCatalog, pustProductCatalog } from 'api/product-catalog'

export interface FormTypes {
	code: string
	name: string
	link?: string
	category: string
	collection: string
	routine: string
	image_url?: string
	countries?: string[]
	product_recommendation_id?: string | null
	product_translations?: { field_name: string; id: number; language: string; value: string }[]
}

export const defaultValues = {
	code: '',
	name: '',
	link: '',
	category: '',
	collection: '',
	routine: '',
	image_url: '',
	countries: [],
	product_recommendation_id: null,
	product_translations: [],
}

export const useCatForm = (values?: DataRowProductCatalog, type?: string) => {
	const queryClient = useQueryClient()
	const [value, setValue] = useState(0)
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		if (type === 'edit') {
			form.reset(values)
		}
	}, [open])

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['product-catalog-list'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const addPost = useMutation((data: FormTypes) => postProductCatalog<FormTypes>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const editPost = useMutation(
		(data: FormTypes) => pustProductCatalog<FormTypes>(data, values?.id),
		{
			onSuccess: handleSuccess,
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const handleClose = () => {
		setToggle(false)
		form.reset(defaultValues)
		setValue(0)
	}

	const handleNext = (n: number) => setValue(n)

	const onSubmit = (data: FormTypes) => {
		if (type === 'edit') {
			editPost.mutate(data)
		} else {
			addPost.mutate(data)
		}
	}

	const isLoading = addPost.isLoading || editPost.isLoading

	return { open, form, value, toggle, isLoading, onSubmit, handleChange, handleNext, handleClose }
}
