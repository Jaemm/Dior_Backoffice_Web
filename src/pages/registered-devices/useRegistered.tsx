import { useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { getRegistered } from 'api/registered-devices'
import { TableColumn } from 'react-data-table-component'
import { Reset } from './components/reset'
import { ButtonReset } from './style'
import { Tooltip } from '@mui/material'

export type DataRow = {
	app_update_date: string | null
	app_version: string
	cal: boolean
	consultant: { id: number; email: string; code: string }
	created_at: string
	division: null
	docking_number: string
	id: number
	lat: null
	license_period: number
	lng: null
	optic_number: number
	refresh_date: string
	serial_number: string
	use_yn: string
	wb: boolean
	country: string
	pos_code: string
	status: string
}

export const useRegistered = () => {
	const [page, setPage] = useState(1)
	const [searchValue, setSearchValue] = useState('')
	const [limit, setLimit] = useState(10)
	const search = useDebounce(searchValue, 500)

	const {
		data = { data: [], total_size: 0 },
		isLoading,
		isFetching,
	} = useQuery(
		['registered-devices', page, limit, search],
		() =>
			getRegistered({
				page,
				limit,
				search,
			}),
		{
			select: data => {
				return data.data
			},
			onError: (err: any) => {
				notifyError(err.response?.data?.error)
			},
			keepPreviousData: true,
		},
	)

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const handlePageChange = (page: number) => {
		setPage(page)
	}

	const handlePerRowsChange = async (newPerPage: number, page: number) => {
		setLimit(newPerPage)
		setPage(page)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Device ID',
				selector: row => row.optic_number,
				sortable: true,
				center: true,
			},
			{
				name: 'Country',
				selector: row => row.country,
				sortable: true,
				center: true,
			},
			{
				name: 'POS code',
				selector: row => row.pos_code,
				sortable: true,
				center: true,
			},
			{
				name: 'BC Code',
				selector: row => row.consultant?.code,
				sortable: true,
				center: true,
			},
			{
				name: 'BC Email',
				selector: row => row.consultant?.email,
				sortable: true,
				center: true,
			},
			{
				name: 'Status',
				selector: row => row.status,
				sortable: true,
				center: true,
			},
			{
				name: 'Action',
				selector: row => row.id,
				sortable: true,
				center: true,
				cell: row => (
					<Tooltip title='Reset'>
						<ButtonReset>
							<Reset id={Number(row.id)} />
						</ButtonReset>
					</Tooltip>
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
		searchValue,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	}
}
