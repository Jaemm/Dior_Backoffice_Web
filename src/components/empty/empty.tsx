import { ReactComponent as IconEmpty } from 'assets/icons/empty.svg'
import { Container } from './style'

export const Empty = () => {
	return (
		<Container>
			<div className='empty'>
				<IconEmpty />
			</div>
			<div className='text'>No data</div>
		</Container>
	)
}
