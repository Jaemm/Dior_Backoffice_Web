import { sampleUser } from './excel'
import { Button } from '@mui/material'
import { Table } from 'components/table'
import { Form } from './components/form'
import { Search } from 'components/search'
import { Upload } from 'components/upload'
import { DataRow, useUser } from './useUser'
import { Delete } from './components/delete'
import { useCountries } from 'hooks/useCountries'
import { ExportExcel } from 'components/export-excel'
import { FilterSelect } from 'components/filter-select'
import { useDataSelectedTable } from 'hooks/useDataSelectedTable'
import { Wrap, Header, LeftSide, RightSide, Container } from './style'

const UserManagement = () => {
	const { countries, isLoading: countryIsLoading } = useCountries()
	const { dataSelected, handleChangeSelect, handleClearAfterDelete } =
		useDataSelectedTable<DataRow>()
	const {
		data,
		columns,
		country,
		isLoading,
		isFetching,
		handleClear,
		searchValue,
		handleSearchChange,
		handleChangeCountry,
	} = useUser()

	return (
		<Container>
			<Wrap>
				<Header>
					<LeftSide>
						<Search value={searchValue} onChange={handleSearchChange} />
						<FilterSelect
							value={country}
							options={countries}
							label='Filter Country'
							isLoading={countryIsLoading}
							onChange={handleChangeCountry}
						/>
						<Button onClick={handleClear}>Reset</Button>
					</LeftSide>
					<RightSide>
						<Form
							type='add'
							buttonTitle='Save'
							title='Add a new user'
							ButtonModal={({ onClick }) => <Button onClick={onClick}>Add</Button>}
						/>
						<Delete<DataRow> list={dataSelected} onClear={handleClearAfterDelete} />
						<Upload
							type='admins'
							keyQuery='admins'
							file={sampleUser}
							title='Upload a list of Users'
							label='Please select Excel user list to upload'
						/>
						<ExportExcel
							loading={isLoading}
							excelTitle='export-users'
							data={dataSelected.map(v => ({
								'First name': v.name,
								'Last name': v.surname,
								Email: v.email,
								Countries: v.countryString,
								'is Admin': v.isAdmin,
							}))}
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

export default UserManagement
