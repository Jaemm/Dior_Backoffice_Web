import { DialogType } from 'types'
import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { forgetPassword } from 'api/login'
import { useToggle } from 'hooks/useToggle'
import { FormForgetTypes } from 'types/login'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEventHandler, FormEvent } from 'react'
import { notifyError, notifySuccess } from 'components/notify'

const defaultValues = {
	email: '',
}

export const useForget = () => {
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormForgetTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const { mutate, isLoading } = useMutation<any, any, FormForgetTypes>(
		(data: FormForgetTypes) => forgetPassword(data),
		{
			onSuccess: async () => {
				await toggle()
				await notifySuccess('Email successfully sent!')
				await form.reset(defaultValues)
			},
			onError: (err: any) => {
				notifyError(err.response?.data?.error || 'Failed to send email.')
			},
		},
	)

	const handleSubmit = (data: FormForgetTypes) => mutate(data)

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		form.handleSubmit(handleSubmit)(e)
	}

	const handleDialog = (e: ChangeEventHandler, reason: DialogType) => {
		if (reason !== 'backdropClick') {
			setToggle(false)
		}
	}

	return { open, form, toggle, isLoading, onSubmit, handleDialog }
}
