import { useToggle } from 'hooks/useToggle'
import { ConfirmModal } from 'components/confirm-modal'
import { notifyError, notifySuccess } from 'components/notify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconReset } from 'assets/icons/reset.svg'
import { resetDevice } from 'api/registered-devices'

interface DeleteType {
	id: number
	isLoading?: boolean
	onSubmit?: () => void
}

export const Reset = ({ id }: DeleteType) => {
	const [open, toggle] = useToggle()
	const queryClient = useQueryClient()

	const resSeleteData = useMutation(resetDevice, {
		onSuccess: data => {
			toggle()
			notifySuccess(data.data.message)
			queryClient.invalidateQueries(['registered-devices'])
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleDelete = (id: number) => {
		resSeleteData.mutate({ id })
	}

	return (
		<ConfirmModal
			isReset
			open={open}
			onClick={toggle}
			onSubmit={() => handleDelete(id)}
			isLoading={resSeleteData.isLoading}
			button={
				<button className='reset' onClick={toggle}>
					<IconReset />
				</button>
			}
			text={
				<>
					<h4 style={{ textAlign: 'center' }}>
						This action will reset use date, use time, mac address and customer/counselor that was
						attached to this device. This action will not reset first use date of the device.
					</h4>
				</>
			}
		/>
	)
}
