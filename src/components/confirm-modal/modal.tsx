import { WrapButtons, Container } from './style'
import { Button, Dialog, IconButton } from '@mui/material'
import { ReactComponent as IconClose } from 'assets/icons/exit.svg'

interface ModalType {
	open: boolean
	isLoading?: boolean
	onClick: () => void
	button?: JSX.Element
	onSubmit?: () => void
	text: string | JSX.Element
}

export const ConfirmModal = ({
	open,
	text,
	button,
	onClick,
	isLoading,
	onSubmit = () => {},
}: ModalType) => {
	return (
		<>
			{button}
			<Dialog
				open={open}
				onClose={onClick}
				PaperProps={{
					style: {
						borderRadius: 24,
						overflow: 'hidden',
					},
				}}
				BackdropProps={{
					style: {
						backdropFilter: 'blur(8px)',
						background: 'rgba(0, 0, 0, 0.7)',
					},
				}}
			>
				<Container>
					<header>
						<IconButton onClick={onClick}>
							<IconClose />
						</IconButton>
					</header>
					<h3>{text}</h3>
					<WrapButtons>
						<Button disabled={isLoading} variant='outlined' onClick={onClick}>
							No
						</Button>
						<Button disabled={isLoading} variant='contained' onClick={onSubmit}>
							Yes
						</Button>
					</WrapButtons>
				</Container>
			</Dialog>
		</>
	)
}
