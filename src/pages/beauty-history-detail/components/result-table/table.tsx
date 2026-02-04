import { Empty } from 'components/empty'
import { AnalysisImage } from '../image'
import { Spinner } from 'components/spinner'
import { Table, WrapSpinner, Container } from './style'

interface ITable {
	list: []
	header: string[]
	isLoading: boolean
}

export const ResultTable = ({ list, header, isLoading }: ITable) => {
	return (
		<Container length={list.length} loading={isLoading}>
			<Table>
				<thead>
					<tr>
						{header.map((v, i) => (
							<th key={i}>{v}</th>
						))}
					</tr>
				</thead>
				{isLoading ? (
					<WrapSpinner>
						<Spinner center />
					</WrapSpinner>
				) : list.length === 0 ? (
					<WrapSpinner>
						<Empty />
					</WrapSpinner>
				) : (
					<tbody>
						{list.map((tr: any, i) => (
							<tr key={i}>
								{tr?.map((td: any, id: number) =>
									tr.length === id + 1 ? (
										<td key={id}>{td === '' ? '-' : <AnalysisImage src={td} />}</td>
									) : (
										<td key={id}>{td}</td>
									),
								)}
							</tr>
						))}
					</tbody>
				)}
			</Table>
		</Container>
	)
}
