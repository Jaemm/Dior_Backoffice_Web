import { Container } from './style'
import { useList } from './useList'
import { ToralCard } from '../total-card'
import { ListSkeleton } from '../list-skeleton'

export const TotalList = () => {
	const { data, isLoading } = useList()
	return (
		<Container>
			{isLoading ? (
				<ListSkeleton />
			) : (
				<>
					<ToralCard
						type='GLOBAL'
						title='Overall Clients'
						value={data.total_clients}
						link='overall-clients'
					/>
					<ToralCard
						type='GLOBAL'
						title='Consultations'
						value={data.total_consultations}
						link='overall-consultations'
					/>
					<ToralCard
						type='Average'
						title='Consultation Time'
						value={data.consultation_time}
						link='overall-time'
					/>
					<ToralCard
						type='GLOBAL'
						title='All Devices'
						value={data.total_devices}
						link='overall-devices'
					/>
					<ToralCard
						type='GLOBAL'
						title='Number of stores'
						value={data.total_branches}
						link='overall-stores'
					/>
				</>
			)}
		</Container>
	)
}
