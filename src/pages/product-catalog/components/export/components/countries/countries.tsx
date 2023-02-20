import { useExcel } from 'hooks/useExcel'
import { WrapDown, Container } from './style'
import { Controller } from 'react-hook-form'
import { useCountries } from 'hooks/useCountries'
import { useCountriesForm } from './useCountriesForm'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { ReactComponent as IconExport } from 'assets/icons/export.svg'
import { Button, FormControl, FormHelperText, MenuItem, Select } from '@mui/material'

export const Countries = () => {
	const { handleExcel } = useExcel()
	const { options, isLoading: countryIsLoading } = useCountries()
	const { form, mutate, country, isLoading, dataWithCountry } = useCountriesForm()

	return (
		<>
			<Container>
				<label htmlFor='country-id-select'>Please select a country</label>
				<FormControl fullWidth size='small'>
					<Controller
						name='filter_by_country'
						control={form.control}
						render={({ field: { onChange, ...rest } }) => (
							<Select
								{...rest}
								fullWidth
								displayEmpty
								onChange={e => {
									onChange(e)
									mutate({ filter_by_country: e.target.value })
								}}
								disabled={countryIsLoading || isLoading}
								id='country-id-select'
								labelId='country-id-select'
								renderValue={value => {
									return value === '' ? (
										<div className='placeholder'>Select Country</div>
									) : (
										options.find((v: any) => v.value === value)?.label
									)
								}}
								IconComponent={props => (
									<WrapDown {...props}>
										<IconDown />
									</WrapDown>
								)}
							>
								{options.map((v: any) => (
									<MenuItem key={v.value} value={v.value}>
										{v.label}
									</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>
				<FormHelperText error={!!form.formState.errors.filter_by_country}>
					{form.formState.errors.filter_by_country?.message as string}
				</FormHelperText>
			</Container>
			<h2>Export selected products exclusion status</h2>
			<Button
				disabled={isLoading}
				startIcon={<IconExport />}
				onClick={() => {
					if (country.length > 0) {
						handleExcel(dataWithCountry, 'export-countries')
					} else {
						form.trigger('filter_by_country')
					}
				}}
			>
				Download
			</Button>
		</>
	)
}
