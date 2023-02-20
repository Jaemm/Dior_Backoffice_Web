import { WrapLink } from './style'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
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

export const useBeauty = () => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [searchValue, setSearchValue] = useState('')
	const [country, setCountry] = useState<string>('')
	const [pos, setPos] = useState<string>('')
	const search = useDebounce(searchValue, 500)
	const [allBranches, setAllBranches] = useState(1)

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['beauty-consultants', page, limit, search, country, pos],
		() =>
			getBeautyConsultants<IParams>({
				per: limit,
				page,
				search,
				filter_by: country,
				filter_by_2: pos,
			}),
		{
			select: data => {
				const newData = data.data.data.filter((v: any) => v.code !== null && v.code.length > 0)
				return { ...data.data, data: newData }
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
	} = useQuery(['branch-companies', allBranches], () => getBranchCompanies({ per: allBranches }), {
		select: data => {
			const onlyOptionPos = data.data.data.map((v: any) => ({ label: v.code, value: v.id }))
			const optionsPos = [{ label: 'All', value: '' }, ...onlyOptionPos]
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
	})

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const handleChangeCountry = (e: SelectChangeEvent<string>) => {
		setCountry(e.target.value)
	}

	const handleChangePos = (e: SelectChangeEvent<string>) => {
		setPos(e.target.value)
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
		setCountry('')
		setPos('')
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
		limit,
		country,
		columns,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		posIsLoading,
		posIsFetching,
		optionPosData,
		handleChangePos,
		handlePageChange,
		handleSearchChange,
		handleChangeCountry,
		handlePerRowsChange,
	}
}
