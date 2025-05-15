import { WrapButtons } from './style'
import { Form } from './components/form'
import { useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { Delete } from './components/single-delete'
import { TableColumn } from 'react-data-table-component'
import { ReactComponent as IconEdit } from 'assets/icons/edit.svg'
import { productRecommendations } from 'api/product-recommendations'

export type DataRow = {
	countries: string[]
	id: string
	name: string
	number_of_products: number
	routine: string
	products: {
		category: string
		code: string
		collection: string
		description: string
		id: number
		principal: boolean
		image_url: string
		link: string
		name: string
		product_type: string
		routine: string
	}[]
	right: string
	status: string
	principal_product: number
}

interface IParams {
	per: number
	page: number
	search: string
}

export const useRecommendation = () => {
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
		['product-recommendations', page, limit, search],
		({ signal }) =>
			productRecommendations<IParams>(
				{
					page,
					search,
					per: limit,
				},
				signal,
			),
		{
			staleTime: 5 * 60 * 1000,
			select: data => {
				const newData = data.data.data.map((v: any) => ({
					...v,
					number_of_products: v.products?.length,
					routine: v.products[0]?.routine,
					status: 'Active',
				}))
				return { ...data.data, data: newData }
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
		['product-recommendations', page, search],
		() =>
			productRecommendations<IParams>({
				page,
				search,
				per: data.total_size,
			}),
		{
			enabled: !isLoading && !isFetching && data.data.length > 0 && page === 1,
			select: data => {
				const newData = data.data.data.map((v: any) => ({
					...v,
					number_of_products: v.products?.length,
					routine: v.products[0]?.routine,
					status: 'Active',
				}))
				return { ...data.data, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)
	const isAllDataLoading = allDataFetching || allDataLoading

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

	const handleClear = () => {
		setSearchValue('')
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Group Name',
				selector: row => row.name,
				sortable: true,
			},
			{
				name: 'Routine',
				selector: row => row.routine,
				sortable: true,
				center: true,
			},
			{
				name: 'Access Rights',
				selector: row => row.right,
				sortable: true,
				center: true,
			},
			{
				name: 'Status',
				selector: row => row.status,
				center: true,
				sortable: true,
			},
			{
				name: 'No. of Products',
				selector: row => row.number_of_products,
				center: true,
				sortable: true,
			},
			{
				name: 'Edit',
				selector: row => row.id,
				center: true,
				cell: row => (
					<WrapButtons>
						<Form
							type='edit'
							values={row}
							buttonTitle='Update'
							total={data.total_size}
							ButtonModal={({ onClick }) => (
								<button onClick={onClick} className='edit'>
									<IconEdit />
								</button>
							)}
						/>
						<Delete name={row.name} id={Number(row.id)} />
					</WrapButtons>
				),
				style: {
					padding: 0,
					borderRadius: '0 10px 10px 0',
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
		searchValue,
		isAllDataLoading,
		handleClear,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	}
}
