import { ReactComponent as IconChowisLogo } from 'assets/icons/chowis-logo.svg'
import { VERSION } from 'constants/version'
import { Container, Content, Footer, Wrapper } from './style'
import { IS_INTERNAL } from 'constants/permissions'
import { CredentialsAuth } from './components/credentials-auth'
import { OktaAuth } from './components/okta-auth'

const LogIn = () => {
	return (
		<Container>
			<Wrapper>
				<Content>{IS_INTERNAL ? <CredentialsAuth /> : <OktaAuth />}</Content>
			</Wrapper>
			<Footer>
				<IconChowisLogo />
				<span>App version {VERSION}</span>
			</Footer>
		</Container>
	)
}

export default LogIn
