import { sampleCon } from './excel'
import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Search } from 'components/search'
import { Upload } from 'components/upload'
import { Delete } from './components/delete'
import { FormMarket } from './components/form'
import { DataRow, useMarket } from './useMarket'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'
import { ExportSelect } from 'components/export-select'

const MarketManagement = () => {
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()
	const { data, columns, isLoading, isFetching, handleClear, searchValue, handleSearchChange } =
		useMarket()

	const selectedMarketData = dataSelected.map(v => ({
		'Market Code': v.code,
		'Market Name': v.name,
		'Default Recommendation': v.default_recommendation,
	}))
	const allMarketData = data.data.map((v: any) => ({
		'Market Code': v.code,
		'Market Name': v.name,
		'Default Recommendation': v.default_recommendation,
	}))

	const title = ['Export selected (Market)', 'Export All']
	const excelTitle = ['Export (Market)', 'Export All (Market)']

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<RightSide>
						<FormMarket
							type='add'
							buttonTitle='Save'
							title='Add a new country'
							ButtonModal={({ onClick }) => <Button onClick={onClick}>Add</Button>}
						/>
						<Delete<DataRow> list={dataSelected} onClear={handleClearAfterDelete} />
						<Upload
							file={sampleCon}
							type='countries'
							keyQuery='all-countries'
							title='Upload a list of Country'
							label='Please select Excel Country list to upload'
						/>

						<ExportSelect
							loading={isLoading || isFetching}
							title={title}
							excelTitle={excelTitle}
							data={[selectedMarketData, allMarketData]}
						/>
					</RightSide>
				</Header>
				<Table<DataRow>
					keyField='id'
					data={data.data}
					columns={columns}
					withOutPagination
					isLoading={isLoading}
					isFetching={isFetching}
					handleChangeSelect={handleChangeSelect}
				/>
			</Wrap>
		</Container>
	)
}

export default MarketManagement
