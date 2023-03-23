import { Content, Container } from './style'

interface ICard {
	type: string
	title: string
	value: string | number
}

export const ToralCard = ({ type, title, value }: ICard) => {
	return (
		<Container>
			<Content>
				<h2>{value}</h2>
				<span>{title}</span>
				<span>({type})</span>
			</Content>
		</Container>
	)
}
