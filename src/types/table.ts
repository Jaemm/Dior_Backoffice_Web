import { TableColumn } from 'react-data-table-component'
import {
	ExpandableIcon,
	ExpandableRowsComponent,
	PaginationChangePage,
	PaginationChangeRowsPerPage,
} from 'react-data-table-component/dist/DataTable/types'

export interface PropTypes<C> {
	data: C[]
	total?: number
	perPage?: number
	keyField?: string
	isLoading: boolean
	isSelectableRows?: boolean
	isFetching?: boolean
	expandableRows?: boolean
	columns: TableColumn<C>[]
	withOutPagination?: boolean
	expandableIcon?: ExpandableIcon
	expandableRowsComponent?: ExpandableRowsComponent<C>
	handleChangeSelect?: (selected: {
		allSelected: boolean
		selectedCount: number
		selectedRows: C[]
	}) => void
	handlePageChange?: PaginationChangePage
	handlePerRowsChange?: PaginationChangeRowsPerPage
}
