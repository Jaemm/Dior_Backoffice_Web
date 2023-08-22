import { WrapRadio } from './style'

import { Radio as MuiRadio } from '@mui/material'

interface RadioProps {
	isChecked?: boolean
	value: any
	onChange?: () => void
}

export const Radio = ({ isChecked, value, onChange }: RadioProps) => {
	return (
		<WrapRadio>
			<MuiRadio
				style={{ marginTop: 10, width: 'fit-content' }}
				checked={isChecked}
				onChange={onChange}
				value={value}
			/>
		</WrapRadio>
	)
}
