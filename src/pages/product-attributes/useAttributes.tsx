import { WrapEdit } from './style'
import { useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { getAttributes } from 'api/product-attributes'
import { TableColumn } from 'react-data-table-component'
import { FormProductAttributes } from './components/form'
import { ReactComponent as IconEdit } from 'assets/icons/edit.svg'

export type DataRow = {
	id: number
	product_attribute_translations: any[]
	typ: string
	value: string
}

interface IParams {
	per: number
	page: number
	search: string
}

export const useAttributes = () => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [searchValue, setSearchValue] = useState('')
	const search = useDebounce(searchValue, 500)

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['getAttributes', page, limit, search],
		({ signal }) => getAttributes<IParams>({ per: limit, page, search }, signal),
		{
			staleTime: 5 * 60 * 1000,
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
		data: allData = {
			data: [],
			total_size: 0,
		},
		isLoading: allDataLoading,
		isFetching: allDataFetching,
	} = useQuery(
		['getAttributes', page, search],
		() => getAttributes<IParams>({ per: data.total_size, page, search }),
		{
			enabled: !isLoading && !isFetching && data.data.length > 0,
			select: data => {
				return data.data
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)

	const isAllDataLoading = allDataLoading || allDataFetching

	const handleClear = () => {
		setSearchValue('')
	}

	const handlePageChange = (page: number) => {
		setPage(page)
	}
	const handlePerRowsChange = (newPerPage: number, page: number) => {
		setLimit(newPerPage)
		setPage(page)
	}

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Attribute Type',
				selector: row => row.typ,
				sortable: true,
				center: true,
			},
			{
				name: 'Attribute Name',
				selector: row => row.value,
				sortable: true,
				center: true,
			},
			{
				name: 'Edit',
				selector: row => row.id,
				center: true,
				cell: row => (
					<FormProductAttributes
						type='edit'
						values={row}
						buttonTitle='Update'
						title='Update attribute'
						ButtonModal={({ onClick }) => (
							<WrapEdit onClick={onClick}>
								<IconEdit />
							</WrapEdit>
						)}
					/>
				),
				style: {
					padding: 0,
					borderRadius: '0 10px 10px 0',
					background: 'linear-gradient(180deg, #303030 0%, #747474 100%)',
				},
				width: '60px',
			},
		],
		[],
	)

	return {
		data,
		limit,
		allData,
		columns,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		isAllDataLoading,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	}
}
