import { create } from 'store/create'
import { FormTypesVarition } from 'types/product-catalog'

interface IEditVar {
	open: boolean
	values?: Partial<FormTypesVarition>
}

interface IHomeState {
	editVariation: IEditVar
	setEditVariation: (e: IEditVar) => void
}

export const useProductCatalogStore = create<IHomeState>((set, get) => ({
	editVariation: { open: false, values: {} },
	setEditVariation: editVariation => set({ editVariation }),
}))
