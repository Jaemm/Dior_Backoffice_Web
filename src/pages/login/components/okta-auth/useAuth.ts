import { yupResolver } from '@hookform/resolvers/yup'
import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OktaFormTypes } from 'types/login'
import { schema } from './form.schema'

const defaultValues = {
	email: '',
	password: '',
}

export const useAuth = () => {
	const navigate = useNavigate()
	const { user } = usePermission()

	const form = useForm<OktaFormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		console.log('useLogin useEffect 실행됨')
		console.log('user:', user)
		console.log('search:', window.location.search)

		// user 초기화되지 않은 경우 무시 (usePermission 비동기 처리 고려)
		if (user === undefined) return

		const searchParams = new URLSearchParams(window.location.search)
		const isSamlLogin = searchParams.get('samlLogin') === 'true'
		const samlError = searchParams.get('error')

		if (samlError) {
			console.error('SAML 로그인 실패:', samlError)
			alert('SAML 로그인에 실패했습니다. 다시 시도하거나 관리자에게 문의하세요.')
			return // 실패했으므로 navigate 막기
		}

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
			const user_type = searchParams.get('role')

			if (token && id && name && user_type) {
				const newUser = {
					token,
					user_id: id,
					name,
					user_type,
				}
				localStorage.setItem('user', JSON.stringify(newUser))

				const url =
					user_type === PERMISSIONS.SUPER_ADMIN || user_type === PERMISSIONS.ADMIN
						? '/brand-details'
						: '/beauty-consultants'

				navigate(url)
			} else {
				console.warn('SAML 로그인 정보 부족: ', { token, id, name, user_type })
			}
		}
	}, [user]) // user가 바뀔 때마다 실행

	const handleSamlLogin = () => {
		const redirectUrl = encodeURIComponent(`${window.location.origin}/login`)
		window.location.href = `https://dior-crm.chowis.cloud/v1/api/consultants/login/saml?redirect=${redirectUrl}`
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleSamlLogin()
	}

	return { form, isLoading: false, onSubmit }
}
