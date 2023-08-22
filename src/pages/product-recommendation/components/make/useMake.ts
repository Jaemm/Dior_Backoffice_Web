import {
	getProductFormRecommendation,
	getProductFormRecommendations,
} from 'api/product-recommendations'
import { useMutation, useQuery } from '@tanstack/react-query'

interface IProduct {
	countries: []
	id: number
	name: string
	routine: string
}

export const useMake = () => {
	const { data = { data: { data: [] } }, isLoading } = useQuery(
		['makeup-product-recommendation'],
		() =>
			getProductFormRecommendations({
				list_type: 'makeup',
			}),
		{
			select: res => {
				const newData = res.data.data.sort(function (product1: IProduct, product2: IProduct) {
					const productName1 = product1.name.toLowerCase()
					const productName2 = product2.name.toLowerCase()
					if (productName1 < productName2) return -1
					if (productName1 > productName2) return 1
					return 0
				})

				return { ...res, data: { ...res.data, data: newData } }
			},
		},
	)

	const { mutate, isLoading: isLoadingMutate } = useMutation(getProductFormRecommendation)
	return {
		data: data?.data?.data,
		mutate,
		isLoading,
		isLoadingMutate,
	}
}
