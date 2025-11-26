import { ReactComponent as IconChowisLogo } from 'assets/icons/chowis-logo.svg'
import version from '../../../package.json'
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
				<span>App version {version.version}</span>
			</Footer>
		</Container>
	)
}

export default LogIn
