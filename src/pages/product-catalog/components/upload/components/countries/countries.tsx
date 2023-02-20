import { Divider } from '@mui/material'
import { Excel } from 'components/excel'
import { UploadInput } from 'components/upload-input'
import { sampleCountries } from './excel'

interface ICountries {
	onClose: () => void
}

export const Countries = ({ onClose }: ICountries) => {
	return (
		<div>
			<Excel data={sampleCountries} title={'sample-countries'} />
			<Divider style={{ margin: '30px 0' }} />
			<UploadInput
				withCountry
				onClose={onClose}
				importDior='import_countries'
				type='product_recommendations'
				keyQuery='product-catalog-list'
				label='Please select Excel Product exclusion list to upload'
			/>
		</div>
	)
}
