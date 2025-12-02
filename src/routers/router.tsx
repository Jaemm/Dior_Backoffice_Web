import { lazy } from 'react'
import { PAGES } from 'constants/page'
import { createBrowserRouter } from 'react-router-dom'

const LogIn = lazy(() => import('pages/login'))
const NotFound = lazy(() => import('pages/not-found'))
const PrivateRouter = lazy(() => import('routers/private'))
const BrandDetails = lazy(() => import('pages/brand-details'))
const BeautyConsultants = lazy(() => import('pages/beauty-consultants'))
const BeautyDetails = lazy(() => import('pages/beauty-details'))
const BeautyHistory = lazy(() => import('pages/beauty-history'))
const BeautyHistoryDetail = lazy(() => import('pages/beauty-history-detail'))
const MarketManagement = lazy(() => import('pages/market-management'))
const Statistics = lazy(() => import('pages/statistics'))
const Statistic = lazy(() => import('pages/statistic'))
const ProductAttributes = lazy(() => import('pages/product-attributes'))
const ProductCatalog = lazy(() => import('pages/product-catalog'))
const ProductRecommendation = lazy(() => import('pages/product-recommendation'))
const RegisteredDevices = lazy(() => import('pages/registered-devices'))
const UserManagement = lazy(() => import('pages/user-management'))
const DeviceLogs = lazy(() => import('pages/device-logs'))

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <LogIn />,
	},
	{
		path: '',
		element: <PrivateRouter />,
		children: [
			{
				path: PAGES.BRAND_DATAILS.path,
				element: <BrandDetails />,
			},
			{
				path: PAGES.BEAUTY_CONSULTANTS.path,
				children: [
					{
						index: true,
						element: <BeautyConsultants />,
					},
					{
						path: ':beautyDetails',
						children: [
							{
								index: true,
								element: <BeautyDetails />,
							},
							{
								path: ':beautyHistory',
								children: [
									{
										index: true,
										element: <BeautyHistory />,
									},
									{
										path: ':beautyHistoryDetail',
										element: <BeautyHistoryDetail />,
									},
								],
							},
						],
					},
				],
			},
			{
				path: PAGES.REGISTERED_DEVICES.path,
				element: <RegisteredDevices />,
			},
			{
				path: PAGES.PRODUCT_CATALOG.path,
				element: <ProductCatalog />,
			},
			{
				path: PAGES.PRODUCT_RECOMMENDATION.path,
				element: <ProductRecommendation />,
			},
			{
				path: PAGES.STATISTICS.path,
				children: [
					{
						index: true,
						element: <Statistics />,
					},
					{
						path: ':typeOfStatistic',
						element: <Statistic />,
					},
				],
			},
			{
				path: PAGES.MARKET_MANAGMENT.path,
				element: <MarketManagement />,
			},
			{
				path: PAGES.USER_MANAGMENT.path,
				element: <UserManagement />,
			},
			{
				path: PAGES.PRODUCT_ATTRIBUTES.path,
				element: <ProductAttributes />,
			},
			{
				path: PAGES.DEVICE_LOGS.path,
				element: <DeviceLogs />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
