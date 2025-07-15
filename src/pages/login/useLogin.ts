import { yupResolver } from '@hookform/resolvers/yup'
import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormTypes } from 'types/login'
import { schema } from './form.schema'
import { loginUser } from 'api/login' // ✅ SAML 응답 가져오기용 API

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

	// ✅ SAML 로그인 후 자동 로그인 처리
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search)
		const isSamlLogin = searchParams.get('samlLogin') === 'true'

		if (user?.token && !isSamlLogin) {
			const url =
				user.user_type === PERMISSIONS.SUPER_ADMIN || user.user_type === PERMISSIONS.ADMIN
					? '/brand-details'
					: '/beauty-consultants'
			navigate(url)
		}

		if (isSamlLogin) {
			loginUser().then(res => {
				const data = res.data

				const user = {
					name: data.name,
					user_id: data.id,
					token: data.token,
					user_type: data.consultant_position?.name || 'DEFAULT',
				}
				localStorage.setItem('user', JSON.stringify(user))

				const url =
					user.user_type === PERMISSIONS.SUPER_ADMIN || user.user_type === PERMISSIONS.ADMIN
						? '/brand-details'
						: '/beauty-consultants'

				navigate(url)
			})
		}
	}, [])

	// ✅ SAML 로그인 시작
	const handleSamlLogin = () => {
		const redirectUrl = encodeURIComponent(`${window.location.origin}/login`)
		window.location.href = `https://stg-dior.chowis.cloud/v1/api/consultants/login/saml?redirect=${redirectUrl}`
	}

	// ✅ 폼 제출 시 SAML 로그인 시도
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleSamlLogin()
	}

	return { form, isLoading: false, onSubmit }
}
