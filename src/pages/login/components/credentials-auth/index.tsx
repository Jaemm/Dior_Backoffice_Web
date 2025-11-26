import { Controller } from 'react-hook-form'
import { ForgetPassword } from 'components/forget'
import { ReactComponent as IconMessage } from 'assets/icons/message.svg'
import { ReactComponent as IconPassword } from 'assets/icons/password.svg'
import { Form, WrapIcons, Remember } from './style'

import {
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material'
import { ReactComponent as IconEyeOpen } from 'assets/icons/eye-open.svg'
import { ReactComponent as IconEyeClose } from 'assets/icons/eye-close.svg'
import { useAuth } from './useAuth'
import { useToggle } from 'hooks/useToggle'

export const CredentialsAuth = () => {
	const [open, toggle] = useToggle()
	const { form, isLoading, onSubmit } = useAuth()

	return (
		<Form onSubmit={onSubmit}>
			<Controller
				name='email'
				control={form.control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						type='email'
						autoComplete='off'
						placeholder='Enter Email Address'
						error={!!form.formState.errors.email}
						helperText={form.formState.errors.email ? form.formState.errors.email?.message : ''}
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

			<Controller
				name='password'
				control={form.control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						autoComplete='off'
						placeholder='Enter Password'
						type={open ? 'text' : 'password'}
						error={!!form.formState.errors.password}
						helperText={
							form.formState.errors.password ? form.formState.errors.password?.message : ''
						}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<IconPassword />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<WrapIcons>
										{open ? (
											<IconButton onClick={toggle}>
												<IconEyeOpen />
											</IconButton>
										) : (
											<IconButton onClick={toggle}>
												<IconEyeClose />
											</IconButton>
										)}
									</WrapIcons>
								</InputAdornment>
							),
						}}
					/>
				)}
			/>

			<Remember>
				<FormControlLabel
					control={
						<Controller
							name='remember'
							control={form.control}
							render={({ field }) => (
								<Checkbox
									{...field}
									checked={field.value}
									onChange={e => field.onChange(e.target.checked)}
								/>
							)}
						/>
					}
					label='Remember me'
				/>
			</Remember>

			<Button disabled={isLoading} variant='contained' type='submit' fullWidth>
				Login
			</Button>

			<ForgetPassword />
		</Form>
	)
}
