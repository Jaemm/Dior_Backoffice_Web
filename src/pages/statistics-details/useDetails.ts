import dayjs from 'dayjs'
import { useState } from 'react'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getPerCountry, getStatisticsType } from 'api/statistics'
import { statisticsType } from 'constants/statistics-type'

export const useDetails = () => {
	const navigate = useNavigate()
	const { typeOfStatistics } = useParams()
	const [view, setView] = useState(false)
	const from = `${dayjs().year()}-${dayjs().month() + 1}-1`
	const to = `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`

	const title =
		typeOfStatistics !== undefined
			? statisticsType[typeOfStatistics as keyof typeof statisticsType]
			: ''

	const { data: tableData = { data: { total: 0, data: [] } }, isLoading } = useQuery(
		['statistics-detail-type', typeOfStatistics],
		() => getStatisticsType({ type: typeOfStatistics! }),
		{
			select: data => {
				const newData = {
					total: data.data
						.map((v: any) => v.total)
						.reduce((prev: number, next: number) => prev + next, 0),
					data: data.data,
				}
				return { ...data, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
		},
	)

	const {
		data: perCountryData = { data: { series: [], categories: [] } },
		isLoading: perIsLoading,
	} = useQuery(['per-country', to, from], () => getPerCountry({ to, from }), {
		select: data => {
			const newData = {
				categories: data.data.map((v: any) => v?.country),
				series: [
					{
						name: 'Client',
						data: data.data.map((v: any) => v?.total_customers),
					},
					{
						name: 'Consultations',
						data: data.data.map((v: any) => v?.total_consultations),
					},
					{
						name: 'QR Codes',
						data: data.data.map((v: any) => v?.total_qr_codes),
					},
				],
			}
			return { ...data, data: newData }
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleBack = () => navigate('/statistics')

	const handleChangeView = () => setView(prev => !prev)

	return {
		view,
		title,
		isLoading,
		tableData,
		handleBack,
		perIsLoading,
		perCountryData,
		handleChangeView,
	}
}
