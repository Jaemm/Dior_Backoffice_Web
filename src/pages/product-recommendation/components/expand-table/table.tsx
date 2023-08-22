import { Container } from './style'

interface ITable {
	data: any[]
}

export const Expandtable = ({ data }: ITable) => {


	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Code</th>
						<th>Category</th>
						<th>Collection</th>
						{data[1].routine==='Makeup' &&<th>Principal</th>}
					</tr>
				</thead>
				<tbody>
					{data.map((v: any) => (
						<tr key={v?.id}>
							<td>{v?.name}</td>
							<td>{v?.code}</td>
							<td>{v?.category}</td>
							<td>{v?.collection}</td>
							 {v.routine === 'Makeup' && <td>{v?.is_principal ? 'Yes' : 'No'}</td>}
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	)
}
