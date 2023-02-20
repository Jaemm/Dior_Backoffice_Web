import { Bar } from 'components/bar'
import { useDetails } from './useDetails'
import { Spinner } from 'components/spinner'
import { Button, Skeleton } from '@mui/material'
import { Title } from 'components/statistics-title'
import { Wrap, BackButton, Header, Table, Contant, Container, IconArrowPointing } from './style'

const StatisticsDetails = () => {
	const {
		view,
		title,
		isLoading,
		tableData,
		handleBack,
		perIsLoading,
		perCountryData,
		handleChangeView,
	} = useDetails()

	return (
		<Container>
			{isLoading ? (
				<Spinner center />
			) : (
				<Wrap>
					<Header>
						<div className='left'>
							<h2>{tableData.data.total}</h2>
							<span>{title}</span>
						</div>
						<Button onClick={handleChangeView}>{view ? 'View list' : 'View graph'}</Button>
						<BackButton onClick={handleBack}>
							<IconArrowPointing />
						</BackButton>
					</Header>
					<Contant>
						<Title title={title} text='Show all of the record' />
						{view ? (
							perIsLoading ? (
								<Skeleton variant='rectangular' height='400px' width='100%' />
							) : (
								<Bar
									series={perCountryData.data.series}
									categories={perCountryData.data.categories}
								/>
							)
						) : (
							<Table>
								<thead>
									<tr>
										<th>COUNTRY/STORE</th>
										<th>CLIENTS</th>
									</tr>
									<tr>
										<th>{title}</th>
										<th>{tableData.data.total}</th>
									</tr>
								</thead>
								{tableData.data.data.map((v: any) => (
									<tbody key={v.name}>
										<tr className='country'>
											<td>{v.name}</td>
											<td>{v.total}</td>
										</tr>
										{v.branches_info.map((t: any) => (
											<tr key={t.name}>
												<td>{t.name}</td>
												<td>{t.total}</td>
											</tr>
										))}
									</tbody>
								))}
							</Table>
						)}
					</Contant>
				</Wrap>
			)}
		</Container>
	)
}

export default StatisticsDetails
