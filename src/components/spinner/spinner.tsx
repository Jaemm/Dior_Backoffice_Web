import { Container } from './style'
import CircularProgress from '@mui/material/CircularProgress'

export interface PropTypes {
	center?: boolean
}

export const Spinner = ({ center }: PropTypes) => {
	return (
		<Container center={center}>
			<CircularProgress />
		</Container>
	)
}
