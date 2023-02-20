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
					</tr>
				</thead>
				<tbody>
					{data.map((v: any) => (
						<tr key={v?.id}>
							<td>{v?.name}</td>
							<td>{v?.code}</td>
							<td>{v?.category}</td>
							<td>{v?.collection}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	)
}
