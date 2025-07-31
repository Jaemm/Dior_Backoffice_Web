import { Table } from 'components/table'
import { Search } from 'components/search'
import { Wrap, Header, Container } from './style'
import { ExportExcel } from 'components/export-excel'
import { DataRow, useRegistered } from './useRegistered'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { ExportSelect } from 'components/export-select'

const RegisteredDevices = () => {
	const { dataSelected, handleChangeSelect } = useDataSelectedTable<DataRow>()
	const {
		data,
		allData,
		limit,
		columns,
		isLoading,
		isFetching,
		searchValue,
		isAlldataLoading,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	} = useRegistered()

	const selectedProductData = dataSelected.map(v => ({
		'Device ID': v.optic_number,
		Country: v.country,
		'POS code': v.pos_code,
		'BC Code': v.consultant?.code,
		'BC Email': v.consultant?.email?.toLocaleLowerCase() || '',
		'User Status': v.status,
	}))
	const allProductData = allData.data.map((v: any) => ({
		'Device ID': v.optic_number,
		Country: v.country,
		'POS Code': v.pos_code,
		'BC Code': v.pos_code,
		'BC Email': v.consultant?.email,
		Status: v.status,
	}))

	const title = ['Export selected (Devices)', 'Export All']
	const excelTitle = ['Export (Devices)', 'Export All (Devices)']

	return (
		<Container>
			<Wrap>
				<Header>
					<Search value={searchValue} onChange={handleSearchChange} />
					<ExportSelect
						loading={isAlldataLoading}
						title={title}
						excelTitle={excelTitle}
						data={[selectedProductData, allProductData]}
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
