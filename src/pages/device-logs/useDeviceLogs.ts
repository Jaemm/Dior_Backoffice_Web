import { useMemo, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { TableColumn } from 'react-data-table-component'
import { exportProductLogs, getProductLogs } from 'api/product-logs'

export type DataRow = {
	id: string
	createdAt: string
	opticNumber: string
	consultantEmail: string
	message: string
}

interface IParams {
	page: number
	take: number
	search: string
}

export const useDeviceLogs = () => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [searchValue, setSearchValue] = useState('')
	const [isExportLoading, setIsExportLoading] = useState(false)

	const search = useDebounce(searchValue, 500)

	const {
		data = { data: [], count: 0, pages: 0 },
		isLoading,
		isFetching,
	} = useQuery(
		['product-logs', limit, page, search],
		({ signal }) => getProductLogs<IParams>({ take: limit, page, search }, signal),
		{
			staleTime: 5 * 60 * 1000,
			select: res => res.data,
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)

	const handleClear = () => {
		setSearchValue('')
	}

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
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
				name: 'Device ID',
				selector: row => row.opticNumber,
				sortable: true,
				center: true,
			},
			{
				name: 'BC Email',
				selector: row => row.consultantEmail,
				sortable: true,
				center: true,
			},
			{
				name: 'Message',
				selector: row => row.message,
				sortable: true,
				center: true,
			},
			{
				name: 'Date',
				selector: row => row.createdAt,
				sortable: true,
				center: true,
			},
		],
		[],
	)

	const handleExport = async () => {
		try {
			setIsExportLoading(true)

			const res = await exportProductLogs()

			const blob = res.data

			const url = URL.createObjectURL(blob)

			const a = document.createElement('a')

			a.href = url
			a.download = 'device_logs.xlsx'
			a.click()

			URL.revokeObjectURL(url)
		} catch (err: any) {
			notifyError(err.message)
		} finally {
			setIsExportLoading(false)
		}
	}

	return {
		data,
		columns,
		isLoading,
		isFetching,
		isExportLoading,
		searchValue,
		page,
		limit,
		handleClear,
		handleSearchChange,
		handlePageChange,
		handlePerRowsChange,
		handleExport,
	}
}
