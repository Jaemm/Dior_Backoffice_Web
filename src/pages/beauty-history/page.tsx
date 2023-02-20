import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Search } from 'components/search'
import { Spinner } from 'components/spinner'
import { DataRow, useHistory } from './useHistory'
import { Datepicker } from 'components/datepicker'
import { ExportExcel } from 'components/export-excel'
import { HeaderTable } from 'components/header-table'
import { Head, Wrap, Title, Header, LeftSide, Container, WrapSpinner } from './style'

const BeautyHistory = () => {
	const {
		data,
		limit,
		dates,
		columns,
		setDates,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		customerData,
		dataSelected,
		handlePageChange,
		customerIsLoading,
		handleSearchChange,
		handleChangeSelect,
		handlePerRowsChange,
	} = useHistory()

	return (
		<Container>
			{customerIsLoading ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<Header>
					<HeaderTable list={customerData.list1} />
					<HeaderTable list={customerData.list2} />
					<HeaderTable list={customerData.list3} />
				</Header>
			)}
			<Title>History Record</Title>
			<Wrap>
				<Head>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						<Datepicker dates={dates} setDates={setDates} />
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<ExportExcel
						loading={isLoading}
						excelTitle='export-users'
						data={dataSelected.map(v => ({
							'Batch ID': v.batch_id,
							'Device ID': v.device_id,
							'Service Name': v.service_name,
							Date: v.date,
							Time: v.time,
						}))}
					/>
				</Head>
				<Table<DataRow>
					perPage={limit}
					data={data.data}
					columns={columns}
					keyField='batch_id'
					isLoading={isLoading}
					total={data.total_size}
					isFetching={isFetching}
					handlePageChange={handlePageChange}
					handleChangeSelect={handleChangeSelect}
					handlePerRowsChange={handlePerRowsChange}
				/>
			</Wrap>
		</Container>
	)
}

export default BeautyHistory
