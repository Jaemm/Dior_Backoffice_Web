import { useState } from 'react'
import { notifyError } from 'components/notify'
import { useDebounce } from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { getProductCatalog } from 'api/product-catalog'

interface IParams {
	limit: number
	search: string
	page: number
	filter_by: string
}

export const useAutoComplete = (products: any, routine: string) => {
	const [searchValue, setSearchValue] = useState('')
	const search = useDebounce(searchValue, 500)

	const {
		data = {
			options: [],
		},
		isLoading,
		isFetching,
	} = useQuery(
		[`product-catalog-list-${routine}`, search],
		() =>
			getProductCatalog<IParams>({
				limit: 10,
				page: 1,
				search,
				filter_by: routine,
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

				const newPro = products
					.filter((p: any) => !newData.find((v: any) => v.code === p.code))
					.filter(({ category, ...a }: any) => (category === routine ? a : false))

				const options = [...newData, ...newPro]

				return { ...data.data, options }
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
			keepPreviousData: true,
		},
	)
	return { data, isLoading, isFetching, setSearchValue }
}
