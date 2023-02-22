import { Spinner } from 'components/spinner'
import { useCountries } from './useCountries'
import { Checkbox, FormControlLabel } from '@mui/material'
import { WrapList, Container, WrapSpinner } from './style'

export const VariationCountries = () => {
	const { countries, isLoading, isFetching, setCountries } = useCountries()
	return (
		<Container>
			{isLoading || isFetching ? (
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
