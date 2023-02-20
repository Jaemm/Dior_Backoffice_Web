import { Divider } from '@mui/material'
import { Excel } from 'components/excel'
import { sampleAttribute } from './excel'
import { UploadInput } from 'components/upload-input'

interface IAttributes {
	onClose: () => void
}

export const Attributes = ({ onClose }: IAttributes) => {
	return (
		<div>
			<Excel data={sampleAttribute} title='sample-attributes' />
			<Divider style={{ margin: '30px 0' }} />
			<UploadInput
				onClose={onClose}
				keyQuery='getAttributes'
				type='product_attributes'
				label='Please select Excel Attributes list to upload'
			/>
		</div>
	)
}
