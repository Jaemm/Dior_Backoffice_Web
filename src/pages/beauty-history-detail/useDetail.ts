import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import { getCustomer, getMoisture, getResult } from 'api/beauty-consultants'

export const useDetail = () => {
	const { state } = useLocation()
	const { beautyHistory } = useParams()
	const moistureHeader = ['Measurement', 'Score', 'Raw Score', 'Image']
	const resulteHeader = ['Measurement', 'Score', 'Raw Value', 'Image']

	const {
		data: customerData = {
			list1: [],
			list2: [],
			list3: [],
		},
		isLoading: customerIsLoading,
	} = useQuery(['beauty-consultants-customer', beautyHistory], () => getCustomer(beautyHistory), {
		select: data => {
			const list1 = [
				{ label: 'CUSTOMER ID', value: data.data?.id },
				{ label: 'CUSTOMER', value: `${data.data?.name ?? ''} ${data.data?.surname ?? ''}` },
				{ label: 'CUSTOMER EMAIL', value: data.data?.email },
			]
			const list2 = [
				{ label: 'PHONE NUMBER', value: data.data?.phone },
				{ label: 'BIRTH DATE', value: data.data?.birth },
				{ label: 'COUNTRY', value: data.data?.country },
			]
			const list3 = [
				{ label: 'SKIN GROUP', value: data.data?.skin_color },
				{ label: 'ETHNICITY', value: data.data?.ethnicity },
				{ label: 'GENDER', value: data.data?.gender },
			]
			return { ...data.data, list1, list2, list3 }
		},
		onError: (err: any) => {
			notifyError(err.message)
		},
		keepPreviousData: true,
	})

	const { data: moistureData = { data: [] }, isLoading: moistureIsLoading } = useQuery(
		['get-beauty-moisture', beautyHistory, state.batch_id, state.analysis_type],
		({ signal }) =>
			getMoisture(
				{
					customer_id: beautyHistory,
					batch_id: state.batch_id,
					analysis_type: state.analysis_type,
				},
				signal,
			),
		{
			select: data => {
				const newData = data.data.data.map((item: any) => [
					item?.measurement,
					Math.floor(Number(item?.args?.score)),
					item?.args.raw || '-',
					item?.original_image ?? '',
				])
				return { ...data.data, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
			keepPreviousData: true,
		},
	)

	const { data: resultData = { data: [] }, isLoading: resultIsLoading } = useQuery(
		['get-beauty-result', beautyHistory, state.batch_id, state.analysis_type],
		({ signal }) =>
			getResult(
				{
					customer_id: beautyHistory,
					batch_id: state.batch_id,
					analysis_type: state.analysis_type,
				},
				signal,
			),
		{
			select: data => {
				let measurement = ''
				let count = 0
				const newData = data.data.data.data
					.sort((a: any, b: any) => {
						if (a.measurement < b.measurement) {
							return -1
						} else if (a.measurement > b.measurement) {
							return 1
						}
						return 0
					})
					.map((v: any) => {
						if (measurement === '') {
							measurement = v.measurement
						}
						if (measurement === v.measurement) {
							count = count + 1
							return {
								...v,
								measurement: `${v?.measurement} ${count}`,
							}
						} else {
							count = 1
							measurement = v.measurement
							return {
								...v,
								measurement: `${v?.measurement} ${count}`,
							}
						}
					})
					.map((item: any) => [
						item?.measurement,
						Math.floor(Number(item?.args?.score)),
						item?.args.raw || '-',
						item?.original_image,
					])

				return { ...data.data, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
			keepPreviousData: true,
		},
	)

	return {
		resultData,
		customerData,
		moistureData,
		resulteHeader,
		moistureHeader,
		resultIsLoading,
		customerIsLoading,
		moistureIsLoading,
	}
}
