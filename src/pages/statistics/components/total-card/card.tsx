import { Link } from 'react-router-dom'
import { Content, Container } from './style'
import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { typeStatistics } from 'constants/type-statistics'

interface ICard {
	type: 'devices' | 'consultations' | 'clients' | 'stores'
	value: string | number
}

export const ToralCard = ({ type, value }: ICard) => {
	const { user, isAdmin } = usePermission()

	if (user?.user_type !== PERMISSIONS.SUPER_ADMIN || type === 'devices') {
		return (
			<Container>
				<Content>
					<h2>{value}</h2>
					<span>{typeStatistics[type]}</span>
					{isAdmin && <span>(GLOBAL)</span>}
				</Content>
			</Container>
		)
	}

	return (
		<Link to={type}>
			<Container>
				<Content>
					<h2>{value}</h2>
					<span>{typeStatistics[type]}</span>
					{isAdmin && <span>(GLOBAL)</span>}
				</Content>
			</Container>
		</Link>
	)
}
