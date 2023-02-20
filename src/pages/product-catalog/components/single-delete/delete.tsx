import { deleteData } from 'api/delete'
import { useToggle } from 'hooks/useToggle'
import { ConfirmModal } from 'components/confirm-modal'
import { notifyError, notifySuccess } from 'components/notify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconDelete } from 'assets/icons/delete.svg'

interface DeleteType {
	id: number
	name: string
	isLoading?: boolean
	onSubmit?: () => void
}

export const Delete = ({ id, name }: DeleteType) => {
	const [open, toggle] = useToggle()
	const queryClient = useQueryClient()

	const resSeleteData = useMutation(deleteData, {
		onSuccess: data => {
			toggle()
			notifySuccess(data.data.message)
			queryClient.invalidateQueries(['product-catalog-list'])
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleDelete = (ids: number[]) => {
		resSeleteData.mutate({ type: 'product_recommendations', ids })
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
