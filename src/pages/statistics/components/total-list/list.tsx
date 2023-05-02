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
					<ToralCard type='consultations' value={data.total_consultations} />
					<ToralCard type='clients' value={data.total_clients} />
					<ToralCard type='devices' value={data.total_devices} />
					<ToralCard type='stores' value={data.total_branches} />
				</>
			)}
		</Container>
	)
}
