import { WrapLink } from './style'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'
import { getBranchCompanies } from 'api/brand-details'
import { TableColumn } from 'react-data-table-component'
import { getBeautyConsultants } from 'api/beauty-consultants'

export type DataRow = {
	code: string
	country: string
	created_at: string
	email: string
	id: number
	name: string
	pos_code: string
	pos_email: string
	status: string
}

interface IParams {
	per: number
	page: number
	search: string
	filter_by?: string
	filter_by_2?: string
}

type Option = {
	label: string
	value: string
}

export const useBeauty = () => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [country, setCountry] = useState<string>('')
	const [pos, setPos] = useState<Option | null>(null)
	const [allBranches, setAllBranches] = useState(1)

	const [searchValue, setSearchValue] = useState('')
	const [selectSearchValue, setSelectSearchValue] = useState('')

	const search = useDebounce(searchValue, 500)
	const selectSearch = useDebounce(selectSearchValue, 500)

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['beauty-consultants', page, limit, search, country, pos],
		({ signal }) =>
			getBeautyConsultants<IParams>(
				{
					per: limit,
					page,
					search,
					filter_by: country,
					filter_by_2: pos?.value,
				},
				signal,
			),
		{
			staleTime: 5 * 60 * 1000,
			select: data => {
				return { ...data.data }
			},
			onSuccess: data => {
				if (data.total_pages > page && data.data.length === 0) {
					setPage(page + 1)
				}
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
			keepPreviousData: true,
		},
	)

	const {
		data: optionPosData = {
			optionsPos: [],
			onlyOptionPos: [],
		},
		isLoading: posIsLoading,
		isFetching: posIsFetching,
	} = useQuery(
		['branch-companies', allBranches, selectSearch, country],
		({ signal }) =>
			getBranchCompanies(
				{ per: allBranches, search: selectSearch, is_bc: true, filter_by: country },
				signal,
			),
		{
			enabled: !!selectSearch,
			staleTime: 5 * 60 * 1000,
			cacheTime: 10 * 60 * 1000,
			select: data => {
				const onlyOptionPos = data.data.data.map((v: any) => ({ label: v.code, value: v.id }))
				const optionsPos = [...onlyOptionPos]
				return { ...data.data, optionsPos, onlyOptionPos }
			},
			onSuccess: data => {
				if (data.total_size > 0) {
					setAllBranches(data.total_size)
				}
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
		},
	)
	const isloadingPOS =
		optionPosData.optionsPos.length === 0 && !selectSearch ? false : posIsLoading || posIsFetching

	const isNoOption =
		optionPosData.optionsPos.length === 0 &&
		selectSearch !== null &&
		posIsLoading !== true &&
		posIsFetching !== true

	const {
		data: allData = {
			data: [],
			total_size: 0,
		},
		isLoading: allDataLoading,
		isFetching: allDataFetching,
	} = useQuery(
		['beauty-consultants', page, search, country, pos],
		() =>
			getBeautyConsultants<IParams>({
				per: data.total_size,
				page,
				search,
				filter_by: country,
				filter_by_2: pos?.value,
			}),
		{
			enabled: !isLoading && !isFetching && data.data.length > 0,
			select: data => {
				return { ...data.data }
			},
			onSuccess: data => {
				if (data.total_pages > page && data.data.length === 0) {
					setPage(page + 1)
				}
			},
			onError: (err: any) => {
				notifyError(err.message)
			},
			keepPreviousData: true,
		},
	)

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const handleSelectSearchChange = (e: any) => {
		setSelectSearchValue(e.target.value)
	}

	const handleChangeCountry = (e: SelectChangeEvent<string>) => {
		setCountry(e.target.value)
	}

	const handleChangePos = (newVal: Option | null) => {
		setPos(newVal)
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
		setSelectSearchValue('')
		setCountry('')
		setPos(null)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Country',
				selector: row => row.country,
				sortable: true,
				center: true,
			},
			{
				name: 'POS Code',
				selector: row => row.pos_code,
				sortable: true,
				center: true,
			},
			{
				name: 'BC Code',
				selector: row => row.code,
				sortable: true,
				center: true,
			},
			{
				name: 'BC Name',
				selector: row => row.name,
				center: true,
			},
			{
				name: 'BC Email',
				selector: row => row.pos_email,
				center: true,
			},
			{
				name: 'User Status',
				selector: row => row.status,
				center: true,
			},
			{
				name: 'Details',
				selector: row => row.id,
				center: true,
				cell: row => (
					<WrapLink>
						<Link to={`${row.id}`}>View Details</Link>
					</WrapLink>
				),
			},
		],
		[],
	)

	return {
		pos,
		data,
		allData,
		limit,
		country,
		columns,
		isLoading,
		isNoOption,
		setCountry,
		isFetching,
		handleClear,
		searchValue,
		isloadingPOS,
		posIsLoading,
		posIsFetching,
		optionPosData,
		isAlldataLoading: allDataFetching || allDataLoading,
		handleChangePos,
		handlePageChange,
		handleSearchChange,
		handleChangeCountry,
		handlePerRowsChange,
		setSelectSearchValue,
		handleSelectSearchChange,
	}
}
