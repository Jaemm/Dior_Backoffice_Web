import { WrapEdit } from './style'
import { isAdmin } from 'utils/isAdmn'
import { Form } from './components/form'
import { useMemo, useState } from 'react'
import { getAdmins } from 'api/user-managment'
import { useDebounce } from 'hooks/useDebounce'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { SelectChangeEvent } from '@mui/material'
import { TableColumn } from 'react-data-table-component'
import { ReactComponent as IconEdit } from 'assets/icons/edit.svg'

export type DataRow = {
	consultant_position_id: number
	countries: string[]
	email: string
	id: number
	name: string
	surname: string
	countryString: string
	isAdmin: string
	password?: string
}

interface IParams {
	search: string
	filter_by?: string
}

export const useUser = () => {
	const [searchValue, setSearchValue] = useState('')
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
		['admins', search, country],
		() => getAdmins<IParams>({ search, filter_by: country }),
		{
			select: data => {
				const newData = data.data.data.map((v: any) => ({
					...v,
					countryString: v.countries.join(' , '),
					isAdmin: isAdmin(v.consultant_position_id, 'string'),
				}))
				return { ...data.data, data: newData }
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)

	const handleClear = () => {
		setSearchValue('')
		setCountry('')
	}

	const handleChangeCountry = (e: SelectChangeEvent<string>) => {
		setCountry(e.target.value)
	}

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'First name',
				selector: row => row.name,
				sortable: true,
				center: true,
			},
			{
				name: 'Last name',
				selector: row => row.surname,
				sortable: true,
				center: true,
			},
			{
				name: 'Email',
				selector: row => row.email,
				center: true,
			},
			{
				name: 'Countries',
				selector: row => row.countryString,
				center: true,
				width: '350px',
			},
			{
				name: 'is Admin',
				selector: row => row.isAdmin,
				center: true,
			},
			{
				name: 'Edit',
				selector: row => row.id,
				center: true,
				cell: row => (
					<Form
						type='edit'
						values={row}
						buttonTitle='Update'
						title='Update a user'
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
		columns,
		country,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		handleSearchChange,
		handleChangeCountry,
	}
}
