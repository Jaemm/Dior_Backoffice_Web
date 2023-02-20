import { Divider } from '@mui/material'
import { Excel } from 'components/excel'
import { UploadInput } from 'components/upload-input'
import { sampleProducts } from './excel'

interface IProducts {
	onClose: () => void
}

export const Products = ({ onClose }: IProducts) => {
	return (
		<div>
			<Excel data={sampleProducts} title={'sample-products'} />
			<Divider style={{ margin: '30px 0' }} />
			<UploadInput
				onClose={onClose}
				type='product_recommendations'
				keyQuery='product-catalog-list'
				label='Please select Excel Product list to updated'
			/>
		</div>
	)
}
