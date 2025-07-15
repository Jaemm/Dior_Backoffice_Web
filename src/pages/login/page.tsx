import { Button } from '@mui/material'
import { ReactComponent as IconChowisLogo } from 'assets/icons/chowis-logo.svg'
import { ReactComponent as IconLogo } from 'assets/icons/logo.svg'
import version from '../../../package.json'
import { Container, Content, Footer, Wrapper } from './style'
import { useLogin } from './useLogin'

const LogIn = () => {
	const { onSubmit } = useLogin()

	return (
		<Container>
			<Wrapper>
				<Content>
					<IconLogo />
					<form onSubmit={onSubmit} style={{ marginTop: '24px' }}>
						<Button type='submit' variant='contained' fullWidth>
							Login with Okta
						</Button>
					</form>
				</Content>
			</Wrapper>
			<Footer>
				<IconChowisLogo />
				<span>App version {version.version}</span>
			</Footer>
		</Container>
	)
}

export default LogIn
