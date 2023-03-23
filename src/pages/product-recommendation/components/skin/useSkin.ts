import { useMutation, useQuery } from '@tanstack/react-query'
import {
	getProductFormRecommendation,
	getProductFormRecommendations,
} from 'api/product-recommendations'

export const useSkin = () => {
	const { data = { data: { data: [] } }, isLoading } = useQuery(
		['skincare-product-recommendation'],
		() =>
			getProductFormRecommendations({
				list_type: 'skincare',
			}),
	)

	const { mutate, isLoading: isLoadingMutate } = useMutation(getProductFormRecommendation)

	return { data: data?.data?.data, mutate, isLoading, isLoadingMutate }
}
