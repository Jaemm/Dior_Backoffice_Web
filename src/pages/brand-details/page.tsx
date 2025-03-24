import { samplePos } from './excel'
import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Search } from 'components/search'
import { Delete } from './components/delete'
import { DataRow, useBrand } from './useBrand'
import { Upload } from '../../components/upload'
import { useCountries } from 'hooks/useCountries'
import { usePermission } from 'hooks/usePermission'
import { PERMISSIONS } from 'constants/permissions'
import { FormBrandDetails } from './components/form'
import { FilterSelect } from 'components/filter-select'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'
import { ExportSelect } from 'components/export-select'

const BrandDetails = () => {
	const { user, isAdminNotBrand } = usePermission()
	const { countries, isLoading: countryIsLoading } = useCountries()
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()

	const {
		data,
		limit,
		country,
		allData,
		columns,
		isLoading,
		isFetching,
		searchValue,
		isAlldataLoading,
		handlePageChange,
		handleSearchChange,
		handleChangeCountry,
		handlePerRowsChange,
	} = useBrand()

	const selectedPOSData = dataSelected.map(v => ({
		Country: v.country,
		'POS Code': v.code,
		'POS Name': v.name,
		'POS Email': v.email,
		'Total Devices': v.total_devices,
		Password: v.password,
	}))
	const selectedDeviceData = dataSelected.map(v => ({
		'Total Devices': v.total_devices,
		Password: v.password,
		'Last Consultation Date': v.last_consultation_date,
	}))

	const allPOSData = Array.isArray(allData)
		? allData.map((v: any) => ({
				Country: v.country,
				'POS Code': v.code,
				'POS Name': v.name,
				'POS Email': v.email,
				'Total Devices': v.total_devices,
				Password: v.password,
		  }))
		: []

	const allDeviceData = Array.isArray(allData)
		? allData.map((v: any) => ({
				'Total Devices': v.total_devices,
				Password: v.password,
				'Last Consultation Date': v.last_consultation_date,
		  }))
		: []

	const titlePOS = ['Export selected (POS)', 'Export all']
	const titleDevices = ['Export selected (Devices)', 'Export all']
	const excelTitlePOS = ['Export (POS)', 'Export all (POS)']
	const excelTitleDevices = ['Export (Devices)', 'Export all (Devices)']

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						{user?.user_type === PERMISSIONS.SUPER_ADMIN && (
							<FilterSelect
								value={country}
								options={countries}
								label='Filter Country'
								isLoading={countryIsLoading}
								onChange={handleChangeCountry}
							/>
						)}
					</LeftSide>
					<RightSide>
						{isAdminNotBrand && (
							<>
								<FormBrandDetails
									type='add'
									buttonTitle='Save'
									title='ADD A NEW POS'
									ButtonModal={({ onClick }) => <Button onClick={onClick}>Add</Button>}
								/>
								<Delete<DataRow> list={dataSelected} onClear={handleClearAfterDelete} />
							</>
						)}
						<Upload
							file={samplePos}
							type='company_branches'
							keyQuery='branch-companies'
							title='Upload a list of POS'
							label='Please select Excel POS list to upload'
						/>
						<ExportSelect
							header='Export POS'
							loading={isAlldataLoading}
							title={titlePOS}
							excelTitle={excelTitlePOS}
							data={[selectedPOSData, allPOSData]}
						/>
						<ExportSelect
							header='Export Devices'
							loading={isAlldataLoading}
							title={titleDevices}
							excelTitle={excelTitleDevices}
							data={[selectedDeviceData, allDeviceData]}
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

export default BrandDetails
