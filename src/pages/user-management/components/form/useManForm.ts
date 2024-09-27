import { schema } from './form.schema'
import { useToggle } from 'hooks/useToggle'
import { useEffect, useState } from 'react'
import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postAdmins, putAdmins } from 'api/user-managment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAdmin } from 'utils/isAdmn'

export interface IValues {
	consultant_position_id: number
	countries: string[]
	email: string
	id: number
	name: string
	surname: string
	countryString: string
	isAdmin: string
	password?: string
}

export interface FormTypes {
	name: string
	surname: string
	email: string
	is_admin?: boolean | string
	countries?: string[]
	password: string
}

export const defaultValues = {
	name: '',
	surname: '',
	email: '',
	is_admin: false,
	countries: [],
	password: '',
}

export const useManForm = (values?: IValues, type?: string) => {
	const queryClient = useQueryClient()
	const [open, toggle, setToggle] = useToggle()
	const [allCountries, setAllCountries] = useState<any[]>([])

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const isAdminWatch = useWatch({ control: form.control, name: 'is_admin' })

	useEffect(() => {
		if (type === 'edit') {
			form.reset({
				email: values?.email,
				name: values?.name,
				surname: values?.surname,
				is_admin: isAdmin(values?.consultant_position_id, 'boolean'),
				countries: values?.countries,
				password: values?.password,
			})
		}
	}, [open])

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['admins'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const addUser = useMutation((data: FormTypes) => postAdmins<FormTypes>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const editUser = useMutation((data: FormTypes) => putAdmins<FormTypes>(data, values?.id), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const resCountry = useQuery(['all-countries'], getCountries, {
		select: data => {
			const options = data.data.data.map((v: any) => ({ label: v.name, value: v.name }))
			return { ...data.data, data: options }
		},
		onSuccess: data => {
			const all = data.data.every((c: any) => form.getValues('countries')?.includes(c.label))
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

	const handleClose = () => {
		setToggle(false)
		form.reset(defaultValues)
	}

	const onSubmit = (data: FormTypes) => {
		if (type === 'edit') {
			editUser.mutate(data)
		} else {
			addUser.mutate(data)
		}
	}

	const isLoading = addUser.isLoading || editUser.isLoading

	return {
		open,
		form,
		toggle,
		onSubmit,
		isLoading,
		resCountry,
		handleClose,
		isAdminWatch,
		allCountries,
		setAllCountries,
	}
}
