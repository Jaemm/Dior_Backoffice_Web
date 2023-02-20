import { PAGES } from './page'
import { ReactComponent as IconDetails } from 'assets/icons/details.svg'
import { ReactComponent as IconConsultants } from 'assets/icons/consultants.svg'
import { ReactComponent as IconDevices } from 'assets/icons/devices.svg'
import { ReactComponent as IconCatalog } from 'assets/icons/catalog.svg'
import { ReactComponent as IconRecommendation } from 'assets/icons/recommendation.svg'
import { ReactComponent as IconPerformance } from 'assets/icons/performance.svg'
import { ReactComponent as IconManagement } from 'assets/icons/management.svg'
import { ReactComponent as IconUser } from 'assets/icons/user.svg'
import { ReactComponent as IconAttributes } from 'assets/icons/attributes.svg'

import { ReactComponent as IconActiveDetails } from 'assets/icons/active-details.svg'
import { ReactComponent as IconActiveConsultants } from 'assets/icons/active-consultants.svg'
import { ReactComponent as IconActiveDevices } from 'assets/icons/active-devices.svg'
import { ReactComponent as IconActiveCatalog } from 'assets/icons/active-catalog.svg'
import { ReactComponent as IconActiveRecommendation } from 'assets/icons/active-recommendation.svg'
import { ReactComponent as IconActivePerformance } from 'assets/icons/active-performance.svg'
import { ReactComponent as IconActiveManagement } from 'assets/icons/active-management.svg'
import { ReactComponent as IconActiveUser } from 'assets/icons/active-user.svg'
import { ReactComponent as IconActiveAttributes } from 'assets/icons/active-attributes.svg'

export const menuList = [
	{
		...PAGES.BRAND_DATAILS,
		Icon: IconDetails,
		ActiveIcon: IconActiveDetails,
	},
	{
		...PAGES.BEAUTY_CONSULTANTS,
		Icon: IconConsultants,
		ActiveIcon: IconActiveConsultants,
	},
	{
		...PAGES.REGISTERED_DEVICES,
		Icon: IconDevices,
		ActiveIcon: IconActiveDevices,
	},
	{
		...PAGES.PRODUCT_CATALOG,
		Icon: IconCatalog,
		ActiveIcon: IconActiveCatalog,
	},
	{
		...PAGES.PRODUCT_RECOMMENDATION,
		Icon: IconRecommendation,
		ActiveIcon: IconActiveRecommendation,
	},
	{
		...PAGES.STATISTICS,
		Icon: IconPerformance,
		ActiveIcon: IconActivePerformance,
	},
]

export const administratorList = [
	{
		...PAGES.MARKET_MANAGMENT,
		Icon: IconManagement,
		ActiveIcon: IconActiveManagement,
	},
	{
		...PAGES.USER_MANAGMENT,
		Icon: IconUser,
		ActiveIcon: IconActiveUser,
	},
	{
		...PAGES.PRODUCT_ATTRIBUTES,
		Icon: IconAttributes,
		ActiveIcon: IconActiveAttributes,
	},
]
