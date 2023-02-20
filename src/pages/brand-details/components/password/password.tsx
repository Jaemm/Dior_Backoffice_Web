import { Container } from './style'
import { useToggle } from 'hooks/useToggle'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { ReactComponent as IconEyeOpen } from 'assets/icons/eye-open.svg'
import { ReactComponent as IconEyeClose } from 'assets/icons/eye-close.svg'

interface IPassword {
	value: string
}

export const Password = ({ value }: IPassword) => {
	const [open, toggle] = useToggle()

	return (
		<Container>
			<TextField
				fullWidth
				id='password'
				value={value}
				inputProps={{ readOnly: true }}
				type={open ? 'text' : 'password'}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							{open ? (
								<IconButton disableRipple onClick={toggle}>
									<IconEyeOpen />
								</IconButton>
							) : (
								<IconButton disableRipple onClick={toggle}>
									<IconEyeClose />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
			/>
		</Container>
	)
}
