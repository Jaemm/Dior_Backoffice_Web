import { Table } from 'components/table'
import { Spinner } from 'components/spinner'
import { DataRow, useDetails } from './useDetails'
import { HeaderTable } from 'components/header-table'
import { ExportExcel } from 'components/export-excel'
import { Wrap, Head, Title, Header, Container, WrapSpinner } from './style'

const BeautyDetails = () => {
	const {
		data,
		limit,
		columns,
		isLoading,
		isFetching,
		detailData,
		dataSelected,
		detailIsLoading,
		handlePageChange,
		handleChangeSelect,
		handlePerRowsChange,
	} = useDetails()

	return (
		<Container>
			{detailIsLoading ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<Header>
					<HeaderTable list={detailData.list1} />
					<HeaderTable list={detailData.list2} />
				</Header>
			)}
			<Title>Assigned Customers</Title>
			<Wrap>
				<Head>
					<ExportExcel
						loading={isLoading}
						excelTitle='export-users'
						data={dataSelected.map(v => ({
							'Last Name': v.name,
							'First Name': v.surname,
							'Email Address': v.email,
							'Phone Number': v.phone,
							Country: v.address,
						}))}
					/>
				</Head>
				<Table<DataRow>
					keyField='id'
					perPage={limit}
					data={data.data}
					columns={columns}
					isLoading={isLoading}
					isFetching={isFetching}
					total={data.total_size}
					handlePageChange={handlePageChange}
					handleChangeSelect={handleChangeSelect}
					handlePerRowsChange={handlePerRowsChange}
				/>
			</Wrap>
		</Container>
	)
}

export default BeautyDetails
