import { WrapDown, Container, Placeholder } from './style'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { MenuItem, Select as MuiSelect, SelectChangeEvent } from '@mui/material'

interface SelectTypes {
	label: string
	value?: string
	onChange?: (e: SelectChangeEvent<string>) => void
	options?: { value: string; label: string }[]
	isLoading?: boolean
}

export const FilterSelect = ({
	label,
	value,
	onChange,
	options = [],
	isLoading = false,
}: SelectTypes) => {
	return (
		<Container>
			<label htmlFor='filter'>{label}</label>
			<MuiSelect
				id='filter'
				displayEmpty
				value={value}
				labelId='filter'
				onChange={onChange}
				disabled={isLoading}
				MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
				IconComponent={props => {
					return (
						<WrapDown {...props}>
							<IconDown />
						</WrapDown>
					)
				}}
				renderValue={value => {
					return value === '' ? (
						<Placeholder>All</Placeholder>
					) : (
						options.find(v => v.value === value)?.label
					)
				}}
			>
				{options.map(({ value, label }) => (
					<MenuItem key={value} value={value}>
						{label}
					</MenuItem>
				))}
			</MuiSelect>
		</Container>
	)
}
