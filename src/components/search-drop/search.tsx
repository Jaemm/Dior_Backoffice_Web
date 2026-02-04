import { Container } from './style'
import { styled } from '@mui/material/styles'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { Autocomplete, TextField } from '@mui/material'
import Popper from '@mui/material/Popper'

const CustomPopper = styled(Popper)({
	width: '240px !important',
})

type Option = {
	label: string
	value: string
}

interface SelectTypes {
	label: string
	value?: Option | null
	onChange?: any
	onChangeText: (e: any) => void
	options?: { value: string; label: string }[]
	isLoading?: boolean
	isNoOption?: boolean
}

export const SearchDropDown = ({
	label,
	value,
	onChange,
	onChangeText,
	options = [],
	isLoading = false,
	isNoOption,
}: SelectTypes) => {
	return (
		<Container>
			<label htmlFor='filter'>{label}</label>
			<Autocomplete
				options={options}
				getOptionLabel={option => option.label}
				isOptionEqualToValue={(option, value) => option.value === value.value}
				size='small'
				PopperComponent={CustomPopper}
				noOptionsText={isNoOption ? 'POS not found' : 'Type to see options'}
				sx={{
					'& .MuiInputBase-root': {
						height: 55,
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
					},
					'& .MuiInputBase-input': { marginTop: '-5px' },
					width: '200px',
				}}
				clearIcon={false}
				popupIcon={<IconDown />}
				loading={isLoading}
				value={value}
				onChange={(e: any, newVal: Option | null) => onChange(newVal)}
				renderOption={(props, option) => (
					<li {...props} key={option.value}>
						{option.label}
					</li>
				)}
				renderInput={params => (
					<TextField onChange={onChangeText} placeholder='Enter POS' {...params} />
				)}
			/>
		</Container>
	)
}
