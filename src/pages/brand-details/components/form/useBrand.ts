import { useEffect } from 'react'
import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useToggle } from 'hooks/useToggle'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { addPos, updatePos } from 'api/brand-details'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface FormTypes {
	country?: string
	code: string
	name: string
	email: string
	password: string
}

export interface IValue {
	code: string
	country?: string
	created_at: string
	email: string
	id: number
	last_consultation_date: string
	name: string
	password: string
	total_devices: number
}

export const defaultValues = {
	country: '',
	code: '',
	name: '',
	email: '',
	password: '',
}

export const useBrand = (values?: IValue, type?: string) => {
	const queryClient = useQueryClient()
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
		await queryClient.invalidateQueries(['branch-companies'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const handleClose = () => {
		setToggle(false)
		form.reset(defaultValues)
	}

	const resAddPos = useMutation((data: FormTypes) => addPos(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})
	const resUpdatePos = useMutation((data: FormTypes) => updatePos<FormTypes>(data, values?.id), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const onSubmit = (data: FormTypes) => {
		if (type === 'edit') {
			resUpdatePos.mutate(data)
		} else {
			resAddPos.mutate(data)
		}
	}

	return { open, form, toggle, onSubmit, resAddPos, handleClose, resUpdatePos }
}
