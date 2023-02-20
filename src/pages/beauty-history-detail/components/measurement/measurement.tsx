import { Table, Container } from './style'
import { useLocation } from 'react-router-dom'

export const Measurement = () => {
	const { state } = useLocation()
	return (
		<Container>
			<Table>
				<tbody>
					<tr>
						<td>
							<span>DEVICE ID</span> |
						</td>
						<td>{state?.device_id ?? '-'}</td>
						<td>
							<span>Product Code</span> |
						</td>
						<td>{state?.analysis_type ?? '-'}</td>
						<td>
							<span>UV INDEX</span> |
						</td>
						<td>-</td>
						<td>
							<span>Date</span> |
						</td>
						<td>{state?.date ?? '-'}</td>
					</tr>
					<tr>
						<td>
							<span>BATCH ID</span> |
						</td>
						<td>{state?.batch_id ?? '-'}</td>
						<td>
							<span>Phone OS</span> |
						</td>
						<td>{state?.deviceOS ?? '-'}</td>
						<td>
							<span>HUMIDITY</span> |
						</td>
						<td>-</td>
						<td>
							<span>Time</span> |
						</td>
						<td>{state?.time ?? '-'}</td>
					</tr>
					<tr>
						<td>
							<span>App Name</span> |
						</td>
						<td>{state?.service_name ?? '-'}</td>
						<td>
							<span>Phone Model</span> |
						</td>
						<td>{state?.deviceModel ?? '-'}</td>
						<td>
							<span>TEMPERATURE</span> |
						</td>
						<td>-</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	)
}
