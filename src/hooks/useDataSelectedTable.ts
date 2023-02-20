import { useState } from 'react'

export const useDataSelectedTable = <T>() => {
	const [dataSelected, setDataSelected] = useState<T[]>([])

	const handleChangeSelect = (selected: {
		allSelected: boolean
		selectedCount: number
		selectedRows: T[]
	}) => {
		setDataSelected(selected.selectedRows)
	}

	const handleClearAfterDelete = () => setDataSelected([])

	return { dataSelected, handleChangeSelect, handleClearAfterDelete }
}
