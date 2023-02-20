import { Line } from '../line'
import { Bar } from 'components/bar'
import { useGraph } from './useGraph'
import { Skeleton } from '@mui/material'
import { Title } from 'components/statistics-title'
import { Container, LeftSide, RightSide } from './style'

export const Graph = () => {
	const { perDate, perCountryData, perIsLoading, perDateIsLoading } = useGraph()
	return (
		<Container>
			<LeftSide>
				<Title
					title='OVERALL PERFORMANCE (PER COUNTRY)'
					text='Show the statistics comparing countries'
				/>
				{perIsLoading ? (
					<Skeleton variant='rectangular' height='400px' width='100%' />
				) : (
					<Bar series={perCountryData.data.series} categories={perCountryData.data.categories} />
				)}
			</LeftSide>
			<RightSide>
				<Title
					title='OVERALL REPORT'
					text='Shows time-framed statistics for clients, consultations and generated QR code.'
				/>
				{perDateIsLoading ? (
					<Skeleton variant='rectangular' height='400px' width='100%' />
				) : (
					<Line series={perDate.data.series} categories={perDate.data.categories} />
				)}
			</RightSide>
		</Container>
	)
}
