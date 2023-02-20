export type DataRowProductCatalog = {
	category: string
	code: string
	collection: string
	countries: string[]
	description: string
	id: number
	image_url: string
	link: string
	name: string
	product_recommendation_id: string
	product_type: string
	product_variants: {
		category: string
		code: string
		collection: string
		description: string
		id: number
		image_url: string
		link: string
		name: string
		product_recommendation_id: number
		product_type: string
		routine: string
		shades: string
	}[]
	routine: string
	shades: string
	product_translations?: {
		field_name: string
		id: number
		language: string
		value: string
	}[]
}
