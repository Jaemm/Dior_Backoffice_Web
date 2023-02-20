import { Table } from './style'

interface ITable {
	list: { label: string; value: string | number }[]
}

export const HeaderTable = ({ list }: ITable) => {
	return (
		<Table>
			<tbody>
				{list.map(({ label, value }) => (
					<tr key={label}>
						<td>{label}</td>
						<td>{value === '' ? '-' : value ?? '-'}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}
