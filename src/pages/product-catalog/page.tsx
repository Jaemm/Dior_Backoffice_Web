import { Button } from '@mui/material'
import { Table } from 'components/table'
import { useCatalog } from './useCatalog'
import { Search } from 'components/search'
import { CatForm } from './components/form'
import { Delete } from './components/delete'
import { Upload } from './components/upload'
import { useCategory } from 'hooks/useCategory'
import { useCollection } from 'hooks/useCollection'
import { usePermission } from 'hooks/usePermission'
import { ExportProduct } from './components/export'
import { FilterSelect } from 'components/filter-select'
import { DataRowProductCatalog } from 'types/product-catalog'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'
import { ExportSelect } from 'components/export-select'

const ProductCatalog = () => {
	const { isAdmin } = usePermission()
	const { optionsCategoryWithAll, categoryIsLoading } = useCategory()
	const { optionsCollectionWithAll, collectionIsLoading } = useCollection()
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRowProductCatalog>()
	const {
		data,
		limit,
		allData,
		columns,
		category,
		isLoading,
		isFetching,
		collection,
		handleClear,
		searchValue,
		isAllDataLoading,
		handlePageChange,
		handleSearchChange,
		handlePerRowsChange,
		handleChangeCategory,
		handleChangeCollection,
	} = useCatalog()

	const selectedDevicesData = dataSelected
	const allDevicesData = allData.data

	const title = ['Export selected (Product)', 'Export All']
	const excelTitle = ['Export (Product)', 'Export All (Product)']

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						<FilterSelect
							value={category}
							label='Filter Category'
							isLoading={categoryIsLoading}
							onChange={handleChangeCategory}
							options={optionsCategoryWithAll}
						/>
						<FilterSelect
							value={collection}
							label='Filter Collection'
							isLoading={collectionIsLoading}
							onChange={handleChangeCollection}
							options={optionsCollectionWithAll}
						/>
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<RightSide>
						{isAdmin && (
							<>
								<CatForm
									type='add'
									buttonTitle='Save'
									ButtonModal={({ onClick }) => <Button onClick={onClick}>Add</Button>}
								/>
								<Delete<DataRowProductCatalog>
									list={dataSelected}
									onClear={handleClearAfterDelete}
								/>
								<Upload />
							</>
						)}
						<ExportSelect
							loading={isAllDataLoading}
							title={title}
							excelTitle={excelTitle}
							data={[selectedDevicesData, allDevicesData]}
						/>
					</RightSide>
				</Header>
				<Table<DataRowProductCatalog>
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

export default ProductCatalog
