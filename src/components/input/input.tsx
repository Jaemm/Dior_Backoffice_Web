import { Container } from './style'
import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

interface IInput {
	id: string
	type?: string
	name: string
	label: string
	error: boolean
	InputProps?: any
	message?: any
	placeholder: string
	autoComplete?: string
	disable?: boolean
	control: Control<any> | undefined
}

export const Input = ({
	id,
	name,
	label,
	error,
	control,
	message,
	InputProps,
	placeholder,
	autoComplete,
	disable,
	type = 'text',
}: IInput) => {
	return (
		<Container>
			<label htmlFor={id}>{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextField
						disabled={disable ?? false}
						id={id}
						fullWidth
						{...field}
						type={type}
						error={error}
						variant='filled'
						placeholder={placeholder}
						autoComplete={autoComplete}
						helperText={error ? message : ''}
						InputProps={{ ...InputProps, disableUnderline: true }}
					/>
				)}
			/>
		</Container>
	)
}
