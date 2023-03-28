import { useEffect } from 'react'
import { getUser } from 'utils/getUser'
import { ARRAY_ALL_PAGES } from 'constants/page'
import { PERMISSIONS } from 'constants/permissions'
import { useLocation, useNavigate } from 'react-router-dom'

export const usePermission = () => {
	const { user } = getUser()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		ARRAY_ALL_PAGES.forEach(v => {
			const newpath = '/' + v.path
			if (newpath.startsWith(pathname)) {
				if (!v.permissions.includes(user?.user_type)) {
					const url =
						user?.user_type === PERMISSIONS.SUPER_ADMIN || user?.user_type === PERMISSIONS.ADMIN
							? '/brand-details'
							: '/beauty-consultants'
					navigate(url)
				}
			}
			return v
		})
	}, [pathname])

	const isAdmin = !(
		user?.user_type === PERMISSIONS.BRAND_MANAGER || user?.user_type === PERMISSIONS.ADMIN
	)

	return { user, isAdmin }
}
