import { Table } from 'components/table'
import { Search } from 'components/search'
import { Wrap, Header, Container } from './style'
import { ExportExcel } from 'components/export-excel'
import { DataRow, useRegistered } from './useRegistered'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'

const RegisteredDevices = () => {
	const { dataSelected, handleChangeSelect } = useDataSelectedTable<DataRow>()
	const {
		data,
		limit,
		columns,
		isLoading,
		isFetching,
		searchValue,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	} = useRegistered()

	return (
		<Container>
			<Wrap>
				<Header>
					<Search value={searchValue} onChange={handleSearchChange} />
					<ExportExcel
						loading={isLoading}
						excelTitle='export-devices'
						data={dataSelected.map(v => ({
							'Device ID': v.optic_number,
							Country: v.country,
							'POS code': v.pos_code,
							'BC Code': v.consultant?.code,
							'BC Email': v.consultant?.email,
							Status: v.status,
						}))}
					/>
				</Header>
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

export default RegisteredDevices
