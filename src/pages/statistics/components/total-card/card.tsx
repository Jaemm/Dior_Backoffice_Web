import { usePermission } from 'hooks/usePermission'
import { Content, Container } from './style'

interface ICard {
	type: string
	title: string
	value: string | number
}

export const ToralCard = ({ type, title, value }: ICard) => {
	const { isAdmin } = usePermission()
	return (
		<Container>
			<Content>
				<h2>{value}</h2>
				<span>{title}</span>
				{isAdmin && <span>({type})</span>}
			</Content>
		</Container>
	)
}
