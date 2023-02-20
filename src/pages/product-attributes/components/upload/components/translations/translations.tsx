import { Divider } from '@mui/material'
import { Excel } from 'components/excel'
import { sampleAttributeTranslation } from './excel'
import { UploadInput } from 'components/upload-input'

interface ITranslations {
	onClose: () => void
}

export const Translations = ({ onClose }: ITranslations) => {
	return (
		<div>
			<Excel data={sampleAttributeTranslation} title={'sample-attribute-translation'} />
			<Divider style={{ margin: '30px 0' }} />
			<UploadInput
				withCountry
				onClose={onClose}
				keyQuery='getAttributes'
				type='product_attributes'
				importDior='import_translations'
				label='Please select Excel attribute translation list to upload'
			/>
		</div>
	)
}
