import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteData } from 'api/delete'
import { notifyError, notifySuccess } from 'components/notify'
import { useToggle } from 'hooks/useToggle'

export const useDelete = (onClear: () => void) => {
	const [open, toggle] = useToggle()
	const queryClient = useQueryClient()

	const resSeleteData = useMutation(deleteData, {
		onSuccess: data => {
			notifySuccess(data.data.message)
			queryClient.invalidateQueries(['all-countries'])
			toggle()
			onClear()
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleDelete = (ids: number[]) => {
		resSeleteData.mutate({ type: 'countries', ids })
	}

	return { open, toggle, resSeleteData, handleDelete }
}
