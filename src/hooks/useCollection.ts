import { notifyError } from 'components/notify'
import { useQuery } from '@tanstack/react-query'
import { getCollection } from 'api/product-catalog'

export const useCollection = () => {
	const {
		data: optionCollectionData = {
			optionsCollection: [],
		},
		isLoading: collectionIsLoading,
	} = useQuery(['product-collection-list'], getCollection, {
		select: data => {
			const optionsCollection = data.data.data.map((v: any) => ({ label: v, value: v }))
			return { ...data.data, optionsCollection }
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	return {
		collectionIsLoading,
		optionsCollection: optionCollectionData.optionsCollection,
		optionsCollectionWithAll: [
			{ label: 'All', value: '' },
			...optionCollectionData.optionsCollection,
		],
	}
}
