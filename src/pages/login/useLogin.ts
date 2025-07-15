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

// role ID → 문자열 매핑
const ROLE_ID_TO_NAME_MAP: Record<string, string> = {
	'4': PERMISSIONS.BRAND_MANAGER,
	'5': PERMISSIONS.SUPER_ADMIN,
	'6': PERMISSIONS.ADMIN,
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
					: '/beauty-consultants'
			navigate(url)
			return
		}

		if (isSamlLogin) {
			const token = searchParams.get('token')
			const id = searchParams.get('id')
			const name = searchParams.get('name')
			const roleId = searchParams.get('role')

			// 👉 콘솔 로그 추가
			console.log('[SAML 로그인 파라미터]', {
				token,
				id,
				name,
				roleId,
			})

			const user_type = ROLE_ID_TO_NAME_MAP[roleId ?? '']

			if (token && id && name && user_type) {
				const user = {
					token,
					user_id: id,
					name,
					user_type,
				}
				console.log('[저장될 사용자 정보]', user) // 👈 로컬스토리지 저장 전 확인

				localStorage.setItem('user', JSON.stringify(user))

				const url =
					user_type === PERMISSIONS.SUPER_ADMIN || user_type === PERMISSIONS.ADMIN
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
