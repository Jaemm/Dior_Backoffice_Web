import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const baseURL = process.env.REACT_APP_BASE_URL

export const useLogin = () => {
	const navigate = useNavigate()
	const { user } = usePermission()

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
			const user_type = searchParams.get('role')

			if (token && id && name) {
				const user = {
					token,
					user_id: id,
					name,
					user_type,
				}
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
		const samlLoginUrl = `${baseURL}/consultants/login/saml?redirect=${redirectUrl}`
		window.location.href = samlLoginUrl
	}

	const onSubmit = () => {
		handleSamlLogin()
	}

	return { isLoading: false, onSubmit }
}
