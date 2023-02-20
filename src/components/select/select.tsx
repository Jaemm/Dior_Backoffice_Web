import { WrapDown, Container } from './style'
import { Control, Controller } from 'react-hook-form'
import { FormHelperText, MenuItem, Select as MuiSelect } from '@mui/material'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'

interface SelectTypes {
	id: string
	label: string
	name: string
	options?: { value: string; label: string }[]
	isLoading?: boolean
	control: Control<any> | undefined
	error: boolean
	message?: any
}

export const Select = ({
	id,
	label,
	name,
	control,
	message,
	error,
	options = [],
	isLoading = false,
}: SelectTypes) => {
	return (
		<Container>
			<label htmlFor={id}>{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<MuiSelect
						id={id}
						displayEmpty
						labelId={id}
						disabled={isLoading}
						IconComponent={props => (
							<WrapDown>
								<IconDown {...props} />
							</WrapDown>
						)}
						{...field}
					>
						{options.map(({ value, label }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))}
					</MuiSelect>
				)}
			/>
			<FormHelperText error={error}>{message}</FormHelperText>
		</Container>
	)
}
