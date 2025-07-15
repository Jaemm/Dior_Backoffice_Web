import { yupResolver } from '@hookform/resolvers/yup'
import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormTypes } from 'types/login'
import { schema } from './form.schema'

const defaultValues = {
	email: '',
	password: '',
}

export const useLogin = () => {
	const navigate = useNavigate()
	const { user } = usePermission()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search)
		const isSamlLogin = searchParams.get('samlLogin') === 'true'

		if (user?.token && !isSamlLogin) {
			const url =
				user.position === PERMISSIONS.SUPER_ADMIN || user.position === PERMISSIONS.ADMIN
					? '/brand-details'
					: '/beauty-consultants'
			navigate(url)
			return
		}

		if (isSamlLogin) {
			const token = searchParams.get('token')
			const refresh_token = searchParams.get('refresh_token')
			const email = searchParams.get('email')
			const name = searchParams.get('name')
			const user_type = searchParams.get('role')
			const position = searchParams.get('consultant_position_id')

			if (token && email && name) {
				const user = {
					token,
					refresh_token,
					email,
					name,
					user_type,
					position,
				}
				localStorage.setItem('user', JSON.stringify(user))

				const url =
					position === PERMISSIONS.SUPER_ADMIN || position === PERMISSIONS.ADMIN
						? '/brand-details'
						: '/beauty-consultants'

				navigate(url)
			}
		}
	}, [])

	const handleSamlLogin = () => {
		const redirectUrl = encodeURIComponent(`${window.location.origin}/login`)
		window.location.href = `https://stg-dior.chowis.cloud/v1/api/consultants/login/saml?redirect=${redirectUrl}`
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleSamlLogin()
	}

	return { form, isLoading: false, onSubmit }
}
