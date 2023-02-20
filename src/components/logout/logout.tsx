import { useLogOut } from './useLogOut'
import { Button, Dialog, IconButton } from '@mui/material'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { ReactComponent as IconLogOut } from 'assets/icons/log-out.svg'
import { Container } from './style'

export const LogOut = () => {
	const { open, toggle, handleDialog, handleLogOut } = useLogOut()

	return (
		<>
			<button className='logout-button' onClick={toggle}>
				<div className='icon'>
					<IconLogOut />
				</div>
				<span>Logout</span>
			</button>
			<Dialog
				open={open}
				onClose={handleDialog}
				BackdropProps={{
					style: {
						backdropFilter: 'blur(25px)',
						background: 'rgba(0, 0, 0, 0.5)',
					},
				}}
				PaperProps={{
					style: {
						borderRadius: '20px',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<Container>
					<IconButton onClick={toggle} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<h3>Logout?</h3>
					<p>Are your sure you want to logout?</p>
					<Button variant='contained' fullWidth onClick={handleLogOut}>
						Logout
					</Button>
				</Container>
			</Dialog>
		</>
	)
}
