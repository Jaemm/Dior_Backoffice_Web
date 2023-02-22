import { WrapList, Container } from './style'
import { useProductCatalogStore } from 'store/product-catalog'

export const VariationCountries = () => {
	const { values } = useProductCatalogStore(state => state.editVariation)

	return (
		<Container>
			<WrapList>
				{values?.countries?.map(country => (
					<div key={country}>{country}</div>
				))}
			</WrapList>
		</Container>
	)
}
