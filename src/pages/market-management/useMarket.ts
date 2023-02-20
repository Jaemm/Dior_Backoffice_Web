import { useMemo, useState } from 'react'
import { getCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { TableColumn } from 'react-data-table-component'

export type DataRow = {
	code: string
	default_recommendation: string
	id: number
	name: string
	url_and_port: string
}

interface IParams {
	search: string
}

export const useMarket = () => {
	const [searchValue, setSearchValue] = useState('')
	const search = useDebounce(searchValue, 500)

	const {
		data = { data: [] },
		isLoading,
		isFetching,
	} = useQuery(['all-countries', search], () => getCountries<IParams>({ search }), {
		select: data => {
			return data.data
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		keepPreviousData: true,
	})

	const handleClear = () => {
		setSearchValue('')
	}

	const handleSearchChange = (e: any) => {
		setSearchValue(e.target.value)
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Market Code',
				selector: row => row.code,
				sortable: true,
				center: true,
			},
			{
				name: 'Market Name',
				selector: row => row.name,
				sortable: true,
				center: true,
			},
			{
				name: 'Default Recommendation',
				selector: row => row.default_recommendation,
				sortable: true,
				center: true,
			},
		],
		[],
	)

	return {
		data,
		columns,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		handleSearchChange,
	}
}
