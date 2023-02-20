import { useNavigate } from 'react-router-dom'
import { Button, Content, Container } from './style'
import { ReactComponent as IconArrowPointing } from 'assets/icons/arrow-pointing.svg'

interface ICard {
	link: string
	type: string
	title: string
	value: string | number
}

export const ToralCard = ({ type, title, value, link }: ICard) => {
	const navigate = useNavigate()
	const handleNavigate = () => navigate(link)

	return (
		<Container>
			<Content>
				<h2>{value}</h2>
				<span>{title}</span>
				<span>({type})</span>
			</Content>
			<Button onClick={handleNavigate}>
				<IconArrowPointing />
			</Button>
		</Container>
	)
}
