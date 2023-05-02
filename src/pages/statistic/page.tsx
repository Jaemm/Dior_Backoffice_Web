import { useStatitic } from './useStatitic'
import { Spinner } from 'components/spinner'
import { Wrap, Table, Container } from './style'
import { usePermission } from 'hooks/usePermission'
import { Navigate, useParams } from 'react-router-dom'
import { typeStatistics } from 'constants/type-statistics'
import { PERMISSIONS } from 'constants/permissions'

const Statistic = () => {
	const { typeOfStatistic } = useParams()
	const { user } = usePermission()
	const { data, total, isLoading } = useStatitic()

	if (user?.user_type !== PERMISSIONS.SUPER_ADMIN) {
		return <Navigate to='/statistics' />
	}

	return (
		<Container>
			{isLoading ? (
				<Spinner center />
			) : (
				<Wrap>
					<Table>
						<thead>
							<tr>
								<th>COUNTRY/STORE</th>
								<th>
									{typeStatistics[typeOfStatistic as keyof typeof typeStatistics]} ({total})
								</th>
							</tr>
						</thead>
						{data.map((v: any) => (
							<tbody key={v.name}>
								<tr className='country'>
									<td>{v.name}</td>
									<td>{v.total}</td>
								</tr>
							</tbody>
						))}
					</Table>
				</Wrap>
			)}
		</Container>
	)
}

export default Statistic
