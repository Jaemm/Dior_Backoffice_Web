import { useEffect, useMemo, useState } from 'react'
import { Image } from './components/image'
import { CatForm } from './components/form'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'
import { Delete } from './components/single-delete'
import { usePermission } from 'hooks/usePermission'
import { getProductCatalog } from 'api/product-catalog'
import { TableColumn } from 'react-data-table-component'
import { DataRowProductCatalog } from 'types/product-catalog'
import { ReactComponent as IconEdit } from 'assets/icons/edit.svg'
import { WrapLink, WrapButton, WrapButtons, WrapImageError } from './style'
interface IParams {
	filter_by?: string
	filter_by_2?: string
	limit: number
	page: number
	search: string
	request_origin: string
}

export const useCatalog = () => {
	const { isAdmin } = usePermission()
	const [page, setPage] = useState(1)
	const [searchValue, setSearchValue] = useState('')
	const [limit, setLimit] = useState(10)
	const search = useDebounce(searchValue, 500)
	const [category, setCategory] = useState<string>('')
	const [collection, setCollection] = useState<string>('')

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['product-catalog-list', page, limit, search, category, collection],
		({ signal }) =>
			getProductCatalog<IParams>(
				{
					limit,
					page,
					search,
					filter_by: category,
					filter_by_2: collection,
					request_origin: 'dior_bo',
				},
				signal,
			),
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
		['product-catalog-list', page, search, category, collection],
		() =>
			getProductCatalog<IParams>({
				limit: data.total_size,
				page,
				search,
				filter_by: category,
				filter_by_2: collection,
				request_origin: 'dior_bo',
			}),
		{
			enabled: !isLoading && !isFetching && data.data.length > 0 && page === 1,
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

	const handleChangeCollection = (e: SelectChangeEvent<string>) => {
		setCollection(e.target.value)
	}

	const handleChangeCategory = (e: SelectChangeEvent<string>) => {
		setCategory(e.target.value)
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

	const handleClear = () => {
		setCategory('')
		setCollection('')
		setSearchValue('')
	}

	const columns: TableColumn<DataRowProductCatalog>[] = useMemo(
		() => [
			{
				name: 'Product Image',
				selector: row => row.image_url,
				center: true,
				width: '155px',
				cell: row =>
					row.image_url ? (
						<Image src={row.image_url} />
					) : (
						<WrapImageError>
							<p>No Image</p>
						</WrapImageError>
					),
			},
			{
				name: 'Product code',
				selector: row => row.code,
				sortable: true,
				center: true,
				width: '160px',
			},
			{
				name: 'Product name',
				selector: row => row.name,
				sortable: true,
				center: true,
			},
			{
				name: 'Category',
				selector: row => row.category,
				center: true,
				width: '160px',
			},
			{
				name: 'Collection',
				selector: row => row.collection,
				center: true,
				width: '160px',
			},
			{
				name: 'Axis',
				selector: row => row.routine,
				center: true,
				width: '160px',
			},
			{
				name: 'Link',
				selector: row => row.link,
				width: '450px',
				cell: row =>
					row.link === 'Product not launched yet' ? (
						row.link
					) : (
						<WrapLink>
							<a href={row.link} target='_blank' rel='noreferrer'>
								{row.link}
							</a>
						</WrapLink>
					),
			},
			{
				name: 'Actions',
				selector: row => row.id,
				width: '70px',
				cell: row =>
					isAdmin ? (
						<WrapButtons>
							<CatForm
								values={row}
								type='edit'
								buttonTitle='Update'
								ButtonModal={({ onClick }) => (
									<button onClick={onClick} className='edit'>
										<IconEdit />
									</button>
								)}
							/>
							<Delete name={row.name} id={Number(row.id)} />
						</WrapButtons>
					) : (
						<WrapButton>
							<CatForm
								values={row}
								type='edit'
								buttonTitle='Update'
								ButtonModal={({ onClick }) => (
									<button onClick={onClick} className='edit'>
										<IconEdit />
									</button>
								)}
							/>
						</WrapButton>
					),
			},
		],
		[],
	)

	return {
		data,
		limit,
		allData,
		columns,
		category,
		isLoading,
		isFetching,
		collection,
		handleClear,
		searchValue,
		isAllDataLoading,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
		handleChangeCategory,
		handleChangeCollection,
	}
}
