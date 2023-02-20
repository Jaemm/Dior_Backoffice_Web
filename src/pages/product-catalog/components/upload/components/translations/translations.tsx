import { Divider } from '@mui/material'
import { Excel } from 'components/excel'
import { UploadInput } from 'components/upload-input'
import { sampleTranslation } from './excel'

interface ITranslations {
	onClose: () => void
}

export const Translations = ({ onClose }: ITranslations) => {
	return (
		<div>
			<Excel data={sampleTranslation} title={'sample-translations'} />
			<Divider style={{ margin: '30px 0' }} />
			<UploadInput
				withCountry
				onClose={onClose}
				type='product_recommendations'
				keyQuery='product-catalog-list'
				importDior='import_translations'
				label='Please select Excel Product translation list to upload'
			/>
		</div>
	)
}
