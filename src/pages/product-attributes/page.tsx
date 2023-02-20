import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Search } from 'components/search'
import { Upload } from './components/upload'
import { Delete } from './components/delete'
import { ExportExcel } from 'components/export-excel'
import { DataRow, useAttributes } from './useAttributes'
import { FormProductAttributes } from './components/form'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'

const ProductAttributes = () => {
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()
	const {
		data,
		limit,
		columns,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	} = useAttributes()

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<RightSide>
						<FormProductAttributes
							type='add'
							buttonTitle='Save'
							title='Add a new attribute'
							ButtonModal={({ onClick }) => <Button onClick={onClick}>Add</Button>}
						/>
						<Delete<DataRow> list={dataSelected} onClear={handleClearAfterDelete} />
						<Upload />
						<ExportExcel
							loading={isLoading}
							excelTitle='export-attributes'
							data={dataSelected.map(v => ({
								'Attribute Type': v.typ,
								'Attribute Name': v.value,
							}))}
						/>
					</RightSide>
				</Header>
				<Table<DataRow>
					keyField='id'
					perPage={limit}
					data={data.data}
					columns={columns}
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

export default ProductAttributes
