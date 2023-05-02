import { PAGES } from 'constants/page'
import { PERMISSIONS } from 'constants/permissions'
import { typeStatistics } from 'constants/type-statistics'
import { useLocation, useParams } from 'react-router-dom'

export const useBread = () => {
	const { pathname } = useLocation()
	const { typeOfStatistic, beautyDetails, beautyHistory, beautyHistoryDetail } = useParams()

	const STATISTIC = {
		main: false,
		title:
			typeOfStatistic !== undefined
				? typeStatistics[typeOfStatistic as keyof typeof typeStatistics]
				: '',
		path: typeOfStatistic,
		permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.BRAND_MANAGER],
	}

	const BEAUTY_DETAILS = {
		main: false,
		title: 'Assigned Customers',
		path: beautyDetails,
		permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
	}

	const BEAUTY_HISTORY = {
		main: false,
		title: 'Analysis History',
		path: beautyHistory,
		permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
	}

	const BEAUTY_HISTORY_DETAILS = {
		main: false,
		title: 'Analysis Details',
		path: beautyHistoryDetail,
		permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
	}

	const titles = [
		STATISTIC,
		PAGES.BRAND_DATAILS,
		PAGES.BEAUTY_CONSULTANTS,
		PAGES.REGISTERED_DEVICES,
		PAGES.PRODUCT_CATALOG,
		PAGES.PRODUCT_RECOMMENDATION,
		PAGES.STATISTICS,
		PAGES.MARKET_MANAGMENT,
		PAGES.USER_MANAGMENT,
		PAGES.PRODUCT_ATTRIBUTES,
		BEAUTY_DETAILS,
		BEAUTY_HISTORY,
		BEAUTY_HISTORY_DETAILS,
	]

	const generateBreadcrumbs = () => {
		const asPathNestedRoutes = pathname.split('/').filter(v => v !== '')

		const crumblist = asPathNestedRoutes.map((subpath, i) => {
			const href = `/${asPathNestedRoutes.slice(0, i + 1).join('/')}`
			const value = titles.find(v => v.path === subpath)

			return {
				href,
				text: value?.title,
				main: !!value?.main,
			}
		})

		return crumblist
	}

	const breadcrumbs = generateBreadcrumbs()

	return { breadcrumbs }
}
