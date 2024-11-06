import { WrapEdit } from './style'
import { useMemo, useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { Password } from './components/password'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'
import { FormBrandDetails } from './components/form'
import { getBranchCompanies } from 'api/brand-details'
import { TableColumn } from 'react-data-table-component'
import { ReactComponent as IconEdit } from 'assets/icons/edit.svg'

export type DataRow = {
	code: string
	country: string
	created_at: string
	email: string
	id: number
	last_consultation_date: string
	name: string
	password: string
	total_devices: number
}

interface IParams {
	per: number
	page: number
	search: string
	filter_by?: string
}

export const useBrand = () => {
	const [page, setPage] = useState(1)
	const [searchValue, setSearchValue] = useState('')
	const [limit, setLimit] = useState(10)
	const search = useDebounce(searchValue, 500)
	const [country, setCountry] = useState<string>('')

	const {
		data = {
			data: [],
			total_size: 0,
		},
		isLoading,
		isFetching,
	} = useQuery(
		['branch-companies', page, limit, search, country],
		() => getBranchCompanies<IParams>({ per: limit, page, search, filter_by: country }),
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

	const handleChangeCountry = (e: SelectChangeEvent<string>) => {
		setCountry(e.target.value)
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
				name: 'Country',
				selector: row => row.country,
				sortable: true,
				center: true,
			},
			{
				name: 'POS Code',
				selector: row => row.code,
				sortable: true,
				center: true,
			},
			{
				name: 'POS Name',
				selector: row => row.name,
				sortable: true,
				center: true,
			},
			{
				name: 'POS Email',
				selector: row => row.email,
				center: true,
			},
			{
				name: 'Total Devices',
				selector: row => row.total_devices,
				center: true,
			},
			{
				name: 'Password',
				selector: row => row.password,
				center: true,
				cell: row => <Password value={row.password} />,
				width: '220px',
			},
			// {
			// 	name: 'Last Consultation Date',
			// 	selector: row => row.last_consultation_date,
			// 	center: true,
			// },
			{
				name: 'Edit',
				selector: row => row.last_consultation_date,
				center: true,
				cell: row => (
					<FormBrandDetails
						values={row}
						type='edit'
						title='UPDATE POS'
						buttonTitle='Update'
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
		country,
		columns,
		isLoading,
		isFetching,
		searchValue,
		handlePageChange,
		handleSearchChange,
		handleChangeCountry,
		handlePerRowsChange,
	}
}
