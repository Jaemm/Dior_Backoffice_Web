import { Container } from './style'
import { ReactComponent as IconChecked } from 'assets/icons/checked.svg'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

export const Active = () => {
	return (
		<Container>
			<FormControl fullWidth>
				<FormLabel id='label-add-beauty'>Is Active</FormLabel>
				<RadioGroup
					row
					className='group'
					name='row-radio-buttons-group'
					aria-labelledby='label-add-beauty'
					defaultValue='active'
				>
					<FormControlLabel
						value='active'
						control={<Radio checkedIcon={<IconChecked className='icon' />} />}
						label='Yes'
					/>
					<FormControlLabel
						value='inactive'
						control={<Radio checkedIcon={<IconChecked className='icon' />} />}
						label='No'
					/>
				</RadioGroup>
			</FormControl>
		</Container>
	)
}
