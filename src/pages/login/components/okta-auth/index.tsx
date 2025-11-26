import { Button } from '@mui/material'
import { ReactComponent as IconLogo } from 'assets/icons/logo.svg'
import { useAuth } from './useAuth'

export const OktaAuth = () => {
	const { onSubmit } = useAuth()

	return (
		<>
			<IconLogo />
			<form onSubmit={onSubmit} style={{ marginTop: '24px' }}>
				<Button type='submit' variant='contained' fullWidth>
					Login
				</Button>
			</form>
		</>
	)
}
