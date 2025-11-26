import { loginUser } from 'api/login'
import { schema } from './form.schema'
import { CredentialsFormTypes } from 'types/login'
import { useForm } from 'react-hook-form'
import { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePermission } from 'hooks/usePermission'
import { useMutation } from '@tanstack/react-query'
import { PERMISSIONS } from 'constants/permissions'
import { yupResolver } from '@hookform/resolvers/yup'
import { notifyError, notifySuccess } from 'components/notify'

const defaultValues = {
	email: '',
	password: '',
}

export const useAuth = () => {
	const navigate = useNavigate()
	const { user } = usePermission()

	const form = useForm<CredentialsFormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		if (user?.token) {
			const url =
				user.user_type === PERMISSIONS.SUPER_ADMIN || user.user_type === PERMISSIONS.ADMIN
					? '/brand-details'
					: '/beauty-consultants'
			navigate(url)
		}
	}, [])

	const { mutate, isLoading } = useMutation(loginUser, {
		onSuccess: async data => {
			const consultant_country = data.data.consultant_country
				? data.data.consultant_country.split(',').map((str: string) => str.trim())
				: null
			const url =
				data.data.consultant_position.name === PERMISSIONS.SUPER_ADMIN ||
				data.data.consultant_position.name === PERMISSIONS.ADMIN
					? '/brand-details'
					: '/beauty-consultants'

			const user = await JSON.stringify({
				consultant_country,
				name: data.data.name,
				user_id: data.data.id,
				token: data.data.token,
				countries: data.data.countries,
				user_type: data.data.consultant_position.name,
			})
			if (form.getValues('remember')) {
				await localStorage.setItem('user', user)
			} else {
				await sessionStorage.setItem('user', user)
			}
			await navigate(url)
			await notifySuccess('Login successfully!')
			await form.reset(defaultValues)
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleSubmit = ({ remember, ...data }: CredentialsFormTypes) => mutate(data as any)

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.stopPropagation()
		return form.handleSubmit(handleSubmit)(e)
	}

	return { form, isLoading, onSubmit }
}
