import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getCategory } from 'api/product-catalog'

export const useCategory = () => {
	const {
		data: optionCategoryData = {
			optionsCategory: [],
		},
		isLoading: categoryIsLoading,
	} = useQuery(['product-category-list'], getCategory, {
		select: data => {
			const optionsCategory = data.data.data.map((v: any) => ({ label: v, value: v }))
			return { ...data.data, optionsCategory }
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	return {
		categoryIsLoading,
		optionsCategory: optionCategoryData.optionsCategory,
		optionsCategoryWithAll: [{ label: 'All', value: '' }, ...optionCategoryData.optionsCategory],
	}
}
