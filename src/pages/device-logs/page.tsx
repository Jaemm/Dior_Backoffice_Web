import { Table } from 'components/table'
import { Search } from 'components/search'
import { Wrap, Header, Container } from './style'
import { DataRow, useDeviceLogs } from './useDeviceLogs'
import { Button } from '@mui/material'
import { ReactComponent as IconExport } from 'assets/icons/export.svg'

const DeviceLogs = () => {
	const {
		data,
		columns,
		isLoading,
		isFetching,
		isExportLoading,
		searchValue,
		limit,
		handleSearchChange,
		handlePageChange,
		handlePerRowsChange,
		handleExport,
	} = useDeviceLogs()

	return (
		<Container>
			<Wrap>
				<Header>
					<Search value={searchValue} onChange={handleSearchChange} />

					<Button startIcon={<IconExport />} onClick={handleExport} disabled={isExportLoading}>
						Export
					</Button>
				</Header>

				<Table<DataRow>
					keyField='id'
					perPage={limit}
					data={data.data}
					columns={columns}
					total={data.count}
					isLoading={isLoading}
					isFetching={isFetching}
					isSelectableRows={false}
					handlePageChange={handlePageChange}
					handlePerRowsChange={handlePerRowsChange}
				/>
			</Wrap>
		</Container>
	)
}

export default DeviceLogs
