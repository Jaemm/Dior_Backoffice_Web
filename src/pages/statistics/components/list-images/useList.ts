import { useQuery } from '@tanstack/react-query'
import { getMostPopularProducts } from 'api/statistics'
import { notifyError } from 'components/notify'

export const useList = () => {
	const { data = { data: [] }, isLoading } = useQuery(
		['most-popular-products'],
		getMostPopularProducts,
		{
			select: data => {
				return data.data
			},
			onError: (err: any) => {
				notifyError(err.response.data.error)
			},
		},
	)

	return { data, isLoading }
}
