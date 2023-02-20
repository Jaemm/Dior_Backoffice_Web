import { Control, Controller } from 'react-hook-form'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { Label, WrapDown, Container, Placeholder } from './style'
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material'

interface SelectTypes {
	name: string
	error: boolean
	disabled?: boolean
	control: Control<any>
	message: string | undefined
	options: { label: string; value: string }[]
}

export const CountrySelect = ({
	name,
	error,
	options,
	control,
	disabled,
	message,
}: SelectTypes) => {
	return (
		<Container>
			<Label htmlFor='country-id-select'>Country</Label>
			<FormControl fullWidth size='small'>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							fullWidth
							displayEmpty
							disabled={disabled}
							id='country-id-select'
							labelId='country-id-select'
							renderValue={value => {
								return value === '' ? (
									<Placeholder>Select Country</Placeholder>
								) : (
									options.find(v => v.value === value)?.label
								)
							}}
							IconComponent={props => (
								<WrapDown {...props}>
									<IconDown />
								</WrapDown>
							)}
						>
							{options.map(v => (
								<MenuItem key={v.value} value={v.value}>
									{v.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>
			<FormHelperText error={error}>{message}</FormHelperText>
		</Container>
	)
}
