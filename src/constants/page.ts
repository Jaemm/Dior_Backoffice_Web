import { PERMISSIONS } from './permissions'

const BRAND_DATAILS = {
	main: true,
	title: 'Brand Details',
	path: 'brand-details',
	permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN],
}

const BEAUTY_CONSULTANTS = {
	main: true,
	title: 'Beauty Consultants',
	path: 'beauty-consultants',
	permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
}

const REGISTERED_DEVICES = {
	main: true,
	title: 'Registered Devices',
	path: 'registered-devices',
	permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
}

const PRODUCT_CATALOG = {
	main: true,
	title: 'Product Catalog',
	path: 'product-catalog',
	permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
}

const PRODUCT_RECOMMENDATION = {
	main: true,
	title: 'Product Recommendation',
	path: 'product-recommendation',
	permissions: [PERMISSIONS.SUPER_ADMIN],
}

const STATISTICS = {
	main: true,
	title: 'Statistics & Reports',
	path: 'statistics',
	permissions: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN, PERMISSIONS.BRAND_MANAGER],
}

const MARKET_MANAGMENT = {
	main: true,
	title: 'Market Management',
	path: 'market-management',
	permissions: [PERMISSIONS.SUPER_ADMIN],
}

const USER_MANAGMENT = {
	main: true,
	title: 'User Management',
	path: 'user-management',
	permissions: [PERMISSIONS.SUPER_ADMIN],
}

const PRODUCT_ATTRIBUTES = {
	main: true,
	title: 'Product Attributes',
	path: 'product-attributes',
	permissions: [PERMISSIONS.SUPER_ADMIN],
}

const DEVICE_LOGS = {
	main: true,
	title: 'Device Logs',
	path: 'device-logs',
	permissions: [PERMISSIONS.SUPER_ADMIN],
}

const PAGES = {
	BRAND_DATAILS,
	BEAUTY_CONSULTANTS,
	REGISTERED_DEVICES,
	PRODUCT_CATALOG,
	PRODUCT_RECOMMENDATION,
	STATISTICS,
	MARKET_MANAGMENT,
	USER_MANAGMENT,
	PRODUCT_ATTRIBUTES,
	DEVICE_LOGS,
}

const ARRAY_ALL_PAGES = [
	BRAND_DATAILS,
	BEAUTY_CONSULTANTS,
	REGISTERED_DEVICES,
	PRODUCT_CATALOG,
	PRODUCT_RECOMMENDATION,
	STATISTICS,
	MARKET_MANAGMENT,
	USER_MANAGMENT,
	PRODUCT_ATTRIBUTES,
	DEVICE_LOGS,
]

export { PAGES, ARRAY_ALL_PAGES }
