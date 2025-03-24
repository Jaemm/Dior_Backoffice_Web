import { PropTypes } from 'types/table'
import { Empty } from 'components/empty'
import { useResize } from 'hooks/useResize'
import { Spinner } from 'components/spinner'
import { LinearProgress } from '@mui/material'
import { Container, WrapSpinner } from './style'
import DataTable from 'react-data-table-component'
import { ReactComponent as IconArrowSort } from 'assets/icons/arrow-sort.svg'
import { rows_per_page } from 'constants/row-option'

export const Table = <C extends unknown>({
	data,
	total,
	columns,
	keyField,
	isLoading,
	isFetching,
	perPage = 10,
	expandableIcon,
	expandableRows,
	handlePageChange,
	handleChangeSelect,
	handlePerRowsChange,
	expandableRowsComponent,
	isSelectableRows = true,
	withOutPagination = false,
}: PropTypes<C>) => {
	const { ref, height } = useResize()

	const paginationComponentOptions = {
		selectAllRowsItem: true,
		selectAllRowsItemText: 'All',
	}

	return (
		<Container ref={ref} maxHeight={height} loading={String(isLoading || data.length === 0)}>
			{isFetching && (
				<div className='linear'>
					<LinearProgress />
				</div>
			)}
			<DataTable
				responsive
				fixedHeader
				data={data}
				paginationServer
				columns={columns}
				keyField={keyField}
				className='custom-table'
				noDataComponent={<Empty />}
				progressPending={isLoading}
				paginationPerPage={perPage}
				paginationTotalRows={total}
				sortIcon={<IconArrowSort />}
				pagination={!withOutPagination}
				expandableRows={expandableRows}
				onChangePage={handlePageChange}
				expandableIcon={expandableIcon}
				selectableRows={isSelectableRows}
				progressComponent={
					<WrapSpinner>
						<Spinner center />
					</WrapSpinner>
				}
				fixedHeaderScrollHeight={`${height}px`}
				onSelectedRowsChange={handleChangeSelect}
				onChangeRowsPerPage={handlePerRowsChange}
				expandableRowsComponent={expandableRowsComponent}
				paginationRowsPerPageOptions={rows_per_page}
				// paginationComponentOptions={paginationComponentOptions}
			/>
		</Container>
	)
}
