import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useToggle } from 'hooks/useToggle'
import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { postAttributes, putAttributes } from 'api/product-attributes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export interface FormTypes {
	typ: string
	value: string
	product_translations?: { field_name: string; id: number; language: string; value: string }[]
}

export interface IValue {
	id: number
	product_attribute_translations: any[]
	typ: string
	value: string
}

export const defaultValues = {
	typ: '',
	value: '',
	product_translations: [],
}

export const useAttributes = (values?: IValue, type?: string) => {
	const queryClient = useQueryClient()
	const [open, toggle, setToggle] = useToggle()
	const [allTranslation, setAllTranslation] = useState<any[]>([])

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		if (type === 'edit') {
			form.reset({
				typ: values?.typ,
				value: values?.value,
				product_translations: values?.product_attribute_translations,
			})
		}
	}, [open])

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['getAttributes'])
		await setToggle(false)
		await form.reset(defaultValues)
		await setAllTranslation([])
	}

	const handleClose = () => {
		form.reset(defaultValues)
		setToggle(false)
		setAllTranslation([])
	}

	const resAdd = useMutation((data: FormTypes) => postAttributes<FormTypes>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const resUpdate = useMutation((data: FormTypes) => putAttributes<FormTypes>(data, values?.id), {
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

	const resCountries = useQuery(['all-countries', open], getCountries, {
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

	const optionsType = [
		{
			label: 'Axis',
			value: 'Axis',
		},
		{
			label: 'Category',
			value: 'Category',
		},
		{
			label: 'Collection',
			value: 'Collection',
		},
	]

	return {
		open,
		form,
		resAdd,
		toggle,
		onSubmit,
		resUpdate,
		optionsType,
		handleClose,
		resCountries,
		allTranslation,
		setAllTranslation,
	}
}
