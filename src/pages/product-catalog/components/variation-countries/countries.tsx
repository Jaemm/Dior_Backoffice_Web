import { useCountries } from './useCountries'
import { Spinner } from 'components/spinner'
import { WrapList, Container, WrapSpinner } from './style'
import { Button, Checkbox, FormControlLabel } from '@mui/material'

export const VariationCountries = () => {
	const { countries, isLoading, setCountries } = useCountries()
	return (
		<Container>
			{isLoading ? (
				<WrapSpinner>
					<Spinner center />
				</WrapSpinner>
			) : (
				<WrapList>
					{countries?.map(({ label, value }) => (
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
		</Container>
	)
}
