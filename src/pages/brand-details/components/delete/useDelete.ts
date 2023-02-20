import { deleteData } from 'api/delete'
import { useToggle } from 'hooks/useToggle'
import { notifyError, notifySuccess } from 'components/notify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDelete = (onClear: () => void) => {
	const [open, toggle] = useToggle()
	const queryClient = useQueryClient()

	const resSeleteData = useMutation(deleteData, {
		onSuccess: data => {
			notifySuccess(data.data.message)
			queryClient.invalidateQueries(['branch-companies'])
			toggle()
			onClear()
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleDelete = (ids: number[]) => {
		resSeleteData.mutate({ type: 'company_branches', ids })
	}

	return { open, toggle, resSeleteData, handleDelete }
}
