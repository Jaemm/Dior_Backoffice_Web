import { useState } from 'react'
import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getProductCatalog } from 'api/product-catalog'

interface IParams {
	page: number
	filter_by: string
	routine: string
}

export const useAutoComplete = (routine: string, filter_by: string) => {
	const [searchValue, setSearchValue] = useState('')
	const [data, setData] = useState({ data: [], options: [] })

	const { isLoading, isFetching } = useQuery(
		[`product-catalog-list-${routine}-${filter_by}`],
		() =>
			getProductCatalog<IParams>({
				page: 1,
				filter_by,
				routine,
			}),
		{
			select: data => {
				const set = new Set()
				data.data.data.forEach((v: any) => set.add(v))
				const newData = Array.from(set).map((v: any) => ({
					code: v.code,
					id: v.id,
					image_url: v.image_url,
					name: v.name,
				}))

				const options = [...newData]

				return { ...data.data, options }
			},
			onSuccess: data => {
				setData({ data: data.options, options: data.options })
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)

	return { data, setData, isLoading, isFetching, searchValue, setSearchValue }
}
