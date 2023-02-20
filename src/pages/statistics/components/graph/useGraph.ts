import dayjs from 'dayjs'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getPerCountry, getPerDate } from 'api/statistics'

export const useGraph = () => {
	const from = `${dayjs().year()}-${dayjs().month() + 1}-1`
	const to = `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`

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

	const { data: perDate = { data: { series: [], categories: [] } }, isLoading: perDateIsLoading } =
		useQuery(['per-date', to, from], () => getPerDate({ to, from }), {
			select: data => {
				const newData = {
					categories: data.data.map((v: any) => v?.month),
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

	return { perDate, perCountryData, perIsLoading, perDateIsLoading }
}
