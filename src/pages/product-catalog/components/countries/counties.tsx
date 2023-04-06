import { Spinner } from 'components/spinner'
import { useCountries } from './useCountries'
import { usePermission } from 'hooks/usePermission'
import { WrapList, Container, WrapSpinner } from './style'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, Checkbox, FormControlLabel } from '@mui/material'

interface ICon {
	type: string
	onNext: (e: number) => void
}

export const Counties = ({ type, onNext }: ICon) => {
	const form = useFormContext()
	const { user, isAdmin } = usePermission()
	const { isLoading, isFetching, allCountries, setAllCountries } = useCountries()

	return (
		<Container>
			<p>This product is available for the below countries</p>
			{isLoading || isFetching ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<WrapList>
					{allCountries
						?.filter(country => {
							if (type === 'add') {
								return country
							}
							if (user.consultant_country) {
								return user.consultant_country.includes(country.label)
							} else {
								if (user.countries.length > 0) {
									return user.countries.includes(country.label)
								}
								return country
							}
						})
						?.map((item: any) => (
							<Controller
								name='countries'
								control={form.control}
								key={item.label}
								render={({ field: { onChange } }) => (
									<FormControlLabel
										control={
											<Checkbox
												checked={item.value}
												onChange={(event, i) => {
													if (item.label === 'All') {
														const newData: any = allCountries.map((v: any) => {
															return { ...v, value: i }
														})
														setAllCountries(newData)
														onChange(
															newData
																.filter((v: any) => v.value && v.label !== 'All')
																.map((a: any) => a.label),
														)
													} else {
														const newData: any = allCountries.map((v: any) => {
															if (v.label === item.label) {
																return { ...v, value: i }
															}
															return v
														})
														const isAll = newData.slice(1).every((e: any) => e.value)
														setAllCountries([{ label: 'All', value: isAll }, ...newData.slice(1)])
														onChange(
															newData
																.filter((v: any) => v.value && v.label !== 'All')
																.map((a: any) => a.label),
														)
													}
												}}
												name={item.label}
												color='primary'
											/>
										}
										label={item.label}
									/>
								)}
							/>
						))}
				</WrapList>
			)}
			<div className='wrapbutton'>
				{isAdmin && (
					<Button variant='outlined' onClick={() => onNext(0)}>
						Previous
					</Button>
				)}
				<Button onClick={() => onNext(isAdmin ? 2 : 1)}>Next</Button>
			</div>
		</Container>
	)
}
