import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Form } from './components/form'
import { Search } from 'components/search'
import { Delete } from './components/delete'
import { ExportExcel } from 'components/export-excel'
import { Expandtable } from './components/expand-table'
import { DataRow, useRecommendation } from './useRecommendation'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { ReactComponent as IconRoundArrow } from 'assets/icons/round-arrow.svg'
import { Wrap, Header, LeftSide, RightSide, WrapRound, Container } from './style'

const ProductRecommendation = () => {
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()
	const {
		data,
		limit,
		columns,
		isLoading,
		isFetching,
		searchValue,
		handleClear,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
	} = useRecommendation()

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<RightSide>
						<Form
							type='add'
							buttonTitle='Save'
							ButtonModal={({ onClick }) => <Button onClick={onClick}>New Group</Button>}
						/>
						<Delete<DataRow> list={dataSelected} onClear={handleClearAfterDelete} />
						<ExportExcel
							loading={isLoading}
							excelTitle='export-recommendation'
							data={dataSelected.map(v => ({
								'Group Name': v.name,
								Routine: v.routine,
								'Access Rights': v.right,
								Status: v.status,
								'No. of Products': v.number_of_products,
							}))}
						/>
					</RightSide>
				</Header>
				<Table<DataRow>
					perPage={limit}
					expandableRows
					keyField='id'
					data={data.data}
					columns={columns}
					isLoading={isLoading}
					total={data.total_size}
					isFetching={isFetching}
					handlePageChange={handlePageChange}
					handleChangeSelect={handleChangeSelect}
					handlePerRowsChange={handlePerRowsChange}
					expandableIcon={{
						collapsed: <IconRoundArrow />,
						expanded: (
							<WrapRound>
								<IconRoundArrow />
							</WrapRound>
						),
					}}
					expandableRowsComponent={row => <Expandtable data={row.data.products} />}
				/>
			</Wrap>
		</Container>
	)
}

export default ProductRecommendation
