import dayjs from 'dayjs'
import { WrapLink } from './style'
import { useMemo, useState } from 'react'
import { DateTypes } from 'types/datepicker'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { TableColumn } from 'react-data-table-component'
import { getBeautyHistory, getCustomer } from 'api/beauty-consultants'

export type DataRow = {
	analysis_type: string
	batch_id: number
	created_time: string
	deviceModel: string
	deviceOS: string
	device_id: number
	lat: number
	long: number
	service_name: string
	date: string
	time: string
}

interface IParams {
	page: number
	limit: number
	search: string
	from: string
	to: string
}

export const useHistory = () => {
	const [page, setPage] = useState(1)
	const { beautyHistory } = useParams()
	const [limit, setLimit] = useState(10)
	const [searchValue, setSearchValue] = useState('')
	const search = useDebounce(searchValue, 500)
	const [dataSelected, setDataSelected] = useState<any[]>([])
	const [dates, setDates] = useState<DateTypes>({})

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['beauty-history', page, limit, search, dates?.from, dates?.to],
		() =>
			getBeautyHistory<IParams>(
				{
					limit,
					page,
					search,
					from: String(dates?.from ? dayjs(dates?.from).format('YYYYMMDD') : ''),
					to: String(dates?.to ? dayjs(dates?.to).format('YYYYMMDD') : ''),
				},
				beautyHistory,
			),
		{
			select: data => {
				const newData = data.data.data[0].data.map((v: any) => ({
					...v,
					analysis_type: 'CNDP Skin',
					service_name: 'Dior-Skin Analysis system',
					batch_id: v.batch_id,
					date: dayjs(v.created_time).format('MM/DD/YYYY'),
					time: dayjs(v.created_time).format('hh:mm A'),
				}))

				return { ...data.data, data: newData, total_size: newData.lenght }
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
			keepPreviousData: true,
		},
	)
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

	const handleChangeSelect = (selected: {
		allSelected: boolean
		selectedCount: number
		selectedRows: DataRow[]
	}) => {
		setDataSelected(selected.selectedRows)
	}

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const handleClear = () => {
		setSearchValue('')
		setDates({})
	}

	const handlePageChange = (page: number) => {
		setPage(page)
	}
	const handlePerRowsChange = (newPerPage: number, page: number) => {
		setLimit(newPerPage)
		setPage(page)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Batch ID',
				selector: row => row.batch_id,
				sortable: true,
				center: true,
			},
			{
				name: 'Device ID',
				selector: row => row.device_id,
				sortable: true,
				center: true,
			},
			{
				name: 'Service Name',
				selector: row => row.service_name,
				sortable: true,
				center: true,
			},
			{
				name: 'Date',
				selector: row => row.date,
				center: true,
			},
			{
				name: 'Time',
				selector: row => row.time,
				center: true,
			},
			{
				name: 'Analysis Details',
				selector: row => row.batch_id,
				center: true,
				cell: row => (
					<WrapLink>
						<Link state={row} to={`${row.batch_id}`}>
							View Details
						</Link>
					</WrapLink>
				),
			},
		],
		[],
	)

	return {
		data,
		limit,
		dates,
		columns,
		setDates,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		customerData,
		dataSelected,
		handlePageChange,
		customerIsLoading,
		handleSearchChange,
		handleChangeSelect,
		handlePerRowsChange,
	}
}
