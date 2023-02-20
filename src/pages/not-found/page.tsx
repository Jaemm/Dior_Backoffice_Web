import { Button } from '@mui/material'
import version from '../../../package.json'
import { useNavigate } from 'react-router-dom'
import { Text, Title, Footer, SubTitle, Wrapper, Container } from './style'
import { ReactComponent as IconChowisLogo } from 'assets/icons/chowis-logo.svg'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<Container>
			<Wrapper>
				<div>
					<Title>404</Title>
					<SubTitle>We couldn&apos;t find...</SubTitle>
					<Text>The page you are looking for does not exist.</Text>
					<Button onClick={() => navigate(-1)} variant='contained'>
						GO BACK
					</Button>
				</div>
			</Wrapper>
			<Footer>
				<IconChowisLogo />
				<span>App version {version.version}</span>
			</Footer>
		</Container>
	)
}

export default NotFound
