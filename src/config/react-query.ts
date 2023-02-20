import { notifyError } from 'components/notify'
import { clearStorage } from 'utils/clearStorage'
import { QueryCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
		},
	},
	queryCache: new QueryCache({
		onError: (error: any) => {
			if (
				error.response?.data?.error === 'You do not have permission.' &&
				error.response?.data?.result_code === 4010
			) {
				clearStorage()
				window.location.href = '/login'
				notifyError('You do not have permission.')
			}
		},
	}),
})
