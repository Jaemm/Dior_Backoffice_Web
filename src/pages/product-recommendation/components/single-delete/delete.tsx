import { useToggle } from 'hooks/useToggle'
import { ConfirmModal } from 'components/confirm-modal'
import { ReactComponent as IconDelete } from 'assets/icons/delete.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifySuccess } from 'components/notify'
import { deleteData } from 'api/delete'

interface DeleteType {
	id: number
	name: string
}

export const Delete = ({ id, name }: DeleteType) => {
	const [open, toggle] = useToggle()
	const queryClient = useQueryClient()

	const resSeleteData = useMutation(deleteData, {
		onSuccess: data => {
			toggle()
			notifySuccess(data.data.message)
			queryClient.invalidateQueries(['product-recommendations'])
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleDelete = (ids: number[]) => {
		resSeleteData.mutate({ type: 'product_recommendation_groups', ids })
	}

	return (
		<ConfirmModal
			open={open}
			onClick={toggle}
			onSubmit={() => handleDelete([id])}
			isLoading={resSeleteData.isLoading}
			button={
				<button className='delete' onClick={toggle}>
					<IconDelete />
				</button>
			}
			text={
				<>
					<h2 style={{ textAlign: 'center' }}>Are you sure you want to delete {name}?</h2>
				</>
			}
		/>
	)
}
