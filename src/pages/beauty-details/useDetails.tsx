import { WrapLink } from './style'
import { useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { TableColumn } from 'react-data-table-component'
import { getAssignedCustomers, getBeautyConsultantsDetail } from 'api/beauty-consultants'

export type DataRow = {
	address: string
	age: number
	app_id: number
	birth: string
	consultant_id: number
	email: string
	ethnicity_id: number
	gender: number
	id: number
	language: string
	name: string
	note: string
	os: number
	phone: string
	push_token: string
	skin_color_group_id: number
	surname: string
}

interface IParams {
	page: number
	limit: number
}

export const useDetails = () => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const { beautyDetails } = useParams()
	const [dataSelected, setDataSelected] = useState<any[]>([])

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['assigned-customers', page, limit, beautyDetails],
		() =>
			getAssignedCustomers<IParams>(
				{
					limit,
					page,
				},
				beautyDetails,
			),
		{
			select: data => {
				return data.data
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)

	const {
		data: detailData = {
			list1: [],
			list2: [],
		},
		isLoading: detailIsLoading,
	} = useQuery(
		['beauty-consultants-detail', beautyDetails],
		() => getBeautyConsultantsDetail(beautyDetails),
		{
			select: data => {
				const list1 = [
					{ label: 'POS CODE', value: data.data?.consultant_branch?.code },
					{ label: 'BC CODE', value: data.data?.code },
				]
				const list2 = [{ label: 'COUNTRY', value: data.data?.consultant_branch?.country }]
				return { ...data.data, list1, list2 }
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
			keepPreviousData: true,
		},
	)

	const handlePageChange = (page: number) => {
		setPage(page)
	}
	const handlePerRowsChange = (newPerPage: number, page: number) => {
		setLimit(newPerPage)
		setPage(page)
	}

	const handleChangeSelect = (selected: {
		allSelected: boolean
		selectedCount: number
		selectedRows: DataRow[]
	}) => {
		setDataSelected(selected.selectedRows)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Last Name',
				selector: row => row.name,
				sortable: true,
				center: true,
			},
			{
				name: 'First Name',
				selector: row => row.surname,
				sortable: true,
				center: true,
			},
			{
				name: 'Email Address',
				selector: row => row.email,
				sortable: true,
				center: true,
			},
			{
				name: 'Phone Number',
				selector: row => row.phone,
				sortable: true,
				center: true,
			},
			{
				name: 'Country',
				selector: row => row.address,
				sortable: true,
				center: true,
			},
			{
				name: 'Analysis History',
				selector: row => row.id,
				center: true,
				cell: row => (
					<WrapLink>
						<Link to={`${row.id}`}>View Analysis</Link>
					</WrapLink>
				),
			},
		],
		[],
	)

	return {
		data,
		limit,
		columns,
		isLoading,
		isFetching,
		detailData,
		dataSelected,
		detailIsLoading,
		handlePageChange,
		handleChangeSelect,
		handlePerRowsChange,
	}
}
