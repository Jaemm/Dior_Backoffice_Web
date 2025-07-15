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
				user.user_type === PERMISSIONS.SUPER_ADMIN || user.user_type === PERMISSIONS.ADMIN
					? '/brand-details'
					: // : '/beauty-consultants'
					  '/beauty-details'

			navigate(url)
			return
		}

		if (isSamlLogin) {
			const token = searchParams.get('token')
			const id = searchParams.get('id')
			const name = searchParams.get('name')
			const user_type = searchParams.get('role')

			if (token && id && name) {
				const user = {
					token,
					user_id: id,
					name,
					user_type,
				}
				console.log('SAML 로그인 성공:', user)
				localStorage.setItem('user', JSON.stringify(user))

				const url =
					user_type === PERMISSIONS.SUPER_ADMIN || user_type === PERMISSIONS.ADMIN
						? '/brand-details'
						: '/brand-details'

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
