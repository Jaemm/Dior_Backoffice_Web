import { useMutation, useQuery } from '@tanstack/react-query'
import {
	getProductFormRecommendation,
	getProductFormRecommendations,
} from 'api/product-recommendations'

export const useMake = () => {
	const { data = { data: { data: [] } }, isLoading } = useQuery(
		['makeup-product-recommendation'],
		() =>
			getProductFormRecommendations({
				list_type: 'makeup',
			}),
	)

	const { mutate, isLoading: isLoadingMutate } = useMutation(getProductFormRecommendation)

	return { data: data?.data?.data, mutate, isLoading, isLoadingMutate }
}
