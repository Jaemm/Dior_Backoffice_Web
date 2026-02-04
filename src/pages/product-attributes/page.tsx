import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Search } from 'components/search'
import { Upload } from './components/upload'
import { Delete } from './components/delete'
import { DataRow, useAttributes } from './useAttributes'
import { FormProductAttributes } from './components/form'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'
import { ExportSelect } from 'components/export-select'

const ProductAttributes = () => {
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()
	const {
		data,
		limit,
		allData,
		columns,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		isAllDataLoading,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	} = useAttributes()

	const selectedAttribData = dataSelected.map(v => ({
		'Attribute Type': v.typ,
		'Attribute Name': v.value,
	}))

	const allAttribData = allData.data.map((v: any) => ({
		'Attribute Type': v.typ,
		'Attribute Name': v.value,
	}))

	const title = ['Export selected (Attrib.)', 'Export All']
	const excelTitle = ['Export (Attrib.)', 'Export All (Attrib.)']

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
						<ExportSelect
							loading={isAllDataLoading}
							title={title}
							excelTitle={excelTitle}
							data={[selectedAttribData, allAttribData]}
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
