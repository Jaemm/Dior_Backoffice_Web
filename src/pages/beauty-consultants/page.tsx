import { sampleBc } from './excel'
import { Button } from '@mui/material'
import { Add } from './components/add'
import { Table } from 'components/table'
import { Search } from 'components/search'
import { Upload } from 'components/upload'
import { Delete } from './components/delete'
import { DataRow, useBeauty } from './useBeauty'
import { useCountries } from 'hooks/useCountries'
import { PERMISSIONS } from 'constants/permissions'
import { usePermission } from 'hooks/usePermission'
import { ExportExcel } from 'components/export-excel'
import { FilterSelect } from 'components/filter-select'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'
import { SearchDropDown } from 'components/search-drop'
import { ExportSelect } from 'components/export-select'

const BeautyConsultants = () => {
	const { user, isAdminNotBrand } = usePermission()
	const { countries, isLoading: countryIsLoading } = useCountries()
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()
	const {
		pos,
		data,
		allData,
		limit,
		country,
		columns,
		isLoading,
		isFetching,
		handleClear,
		setCountry,
		searchValue,
		isNoOption,
		optionPosData,
		isloadingPOS,
		isAlldataLoading,
		handleChangePos,
		handlePageChange,
		handleSearchChange,
		handleChangeCountry,
		handlePerRowsChange,
		setSelectSearchValue,
		handleSelectSearchChange,
	} = useBeauty()

	const selectedBCData = dataSelected.map(v => ({
		Country: v.country,
		'POS Code': v.pos_code,
		'BC Code': v.code,
		'BC Name': v.name,
		'BC Email': v.pos_email,
		'User Status': v.status,
	}))
	const allBCData = allData.data.map((v: any) => ({
		Country: v.country,
		'POS Code': v.pos_code,
		'BC Code': v.code,
		'BC Name': v.name,
		'BC Email': v.pos_email,
		'User Status': v.status,
	}))

	const title = ['Export selected (BC)', 'Export All']
	const excelTitle = ['Export (BC)', 'Export All (BC)']

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						{(user?.user_type === PERMISSIONS.SUPER_ADMIN ||
							user?.user_type === PERMISSIONS.ADMIN) && (
							<FilterSelect
								value={country}
								label='Filter Country'
								options={countries}
								onChange={handleChangeCountry}
								isLoading={countryIsLoading}
							/>
						)}
						<SearchDropDown
							value={pos}
							label='Filter Pos'
							onChange={handleChangePos}
							onChangeText={handleSelectSearchChange}
							options={optionPosData.optionsPos}
							isLoading={isloadingPOS}
							isNoOption={isNoOption}
						/>
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<RightSide>
						{isAdminNotBrand && (
							<>
								<Add
									optionsPos={optionPosData.onlyOptionPos}
									onChangeText={handleSelectSearchChange}
									isPOSLoading={isloadingPOS}
									onChange={handleChangePos}
									isNoOption={isNoOption}
									setCountry={setCountry}
									setPOSValue={setSelectSearchValue}
								/>
								<Delete<DataRow> list={dataSelected} onClear={handleClearAfterDelete} />
							</>
						)}
						<Upload
							file={sampleBc}
							type='company_consultants'
							keyQuery='beauty-consultants'
							title='Upload a list of Beauty Consultant'
							label='Please select Excel BC list to upload'
						/>
						<ExportSelect
							loading={isAlldataLoading}
							title={title}
							excelTitle={excelTitle}
							data={[selectedBCData, allBCData]}
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

export default BeautyConsultants
