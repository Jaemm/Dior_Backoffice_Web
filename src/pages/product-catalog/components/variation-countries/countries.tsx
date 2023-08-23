import { Spinner } from 'components/spinner'
import { useCountries } from './useCountries'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { WrapList, Container, WrapSpinner } from './style'
import { usePermission } from 'hooks/usePermission'

export const VariationCountries = ({ onNext }: { onNext: (n: number) => void }) => {
	const { countries, isLoading, isFetching, setCountries } = useCountries()
	const { user, isAdmin } = usePermission()
	return (
		<Container>
			<p>This variation is available for the below countries</p>
			{isLoading || isFetching ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<WrapList>
					{countries
							?.filter(country => {
								if(isAdmin){
									return country
								}
								else {
									return user.countries.includes(country.label)
								}
						    })
					.map(({ label, value }) => (
						<FormControlLabel
							key={label}
							control={
								<Checkbox
									name={label}
									color='primary'
									checked={value}
									onChange={(_, i) => {
										if (label === 'All') {
											const newData: any = countries.map((v: any) => {
												return { ...v, value: i }
											})
											setCountries(newData)
										} else {
											const newData: any = countries.map((v: any) => {
												if (v.label === label) {
													return { ...v, value: i }
												}
												return v
											})
											const isAll = newData.slice(1).every((e: any) => e.value)
											setCountries([{ label: 'All', value: isAll }, ...newData.slice(1)])
										}
									}}
								/>
							}
							label={label}
						/>
					))}
				</WrapList>
			)}
			<Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={() => onNext(1)}>Next</Button>
			</Box>
		</Container>
	)
}
