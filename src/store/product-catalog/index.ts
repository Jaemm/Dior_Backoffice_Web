import { create } from 'store/create'
import { FormTypesVarition } from 'types/product-catalog'

interface IEditVar {
	open: boolean
	values?: Partial<FormTypesVarition>
}

type ICountries = { label: string; value: boolean }[]

interface IHomeState {
	countries: ICountries
	editVariation: IEditVar
	setCountries: (e: ICountries) => void
	setEditVariation: (e: IEditVar) => void
}

export const useProductCatalogStore = create<IHomeState>((set, get) => ({
	countries: [],
	editVariation: { open: false, values: {} },
	setCountries: countries => set({ countries }),
	setEditVariation: editVariation => set({ editVariation }),
}))
