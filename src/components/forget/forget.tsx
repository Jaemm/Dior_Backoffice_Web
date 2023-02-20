import { useForget } from './useForget'
import Dialog from '@mui/material/Dialog'
import { Controller } from 'react-hook-form'
import { Container, ForgetButton } from './style'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { ReactComponent as IconMessage } from 'assets/icons/message.svg'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'

export const ForgetPassword = () => {
	const { open, form, toggle, isLoading, onSubmit, handleDialog } = useForget()

	return (
		<>
			<ForgetButton onClick={toggle}>Forget Password?</ForgetButton>
			<Dialog
				open={open}
				onClose={handleDialog}
				BackdropProps={{
					style: {
						backdropFilter: 'blur(25px)',
						background: 'rgba(204, 204, 204, 0.2)',
					},
				}}
				PaperProps={{
					style: {
						borderRadius: '20px',
						padding: '30px 30px 45px',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<Container>
					<IconButton onClick={toggle} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<h3>Forget Password?</h3>
					<form onSubmit={onSubmit}>
						<div>
							<Controller
								name='email'
								control={form.control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										autoFocus
										type='email'
										placeholder='Enter Email Address'
										error={!!form.formState.errors.email}
										helperText={
											form.formState.errors.email ? form.formState.errors.email?.message : ''
										}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<IconMessage />
												</InputAdornment>
											),
										}}
									/>
								)}
							/>
							<p className='info'>You will receive recovery password in your email</p>
						</div>
						<Button disabled={isLoading} variant='contained' type='submit' fullWidth>
							Recover
						</Button>
					</form>
				</Container>
			</Dialog>
		</>
	)
}
