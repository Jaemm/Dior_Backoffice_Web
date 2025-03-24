import { useExcel } from 'hooks/useExcel'
import { useState } from 'react'

export const useExcelSelect = () => {
	const { handleExcel } = useExcel()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = (data: any, excelTitle: string) => {
		setAnchorEl(null)
		handleExcel(data, excelTitle)
	}
	return {
		open,
		handleClose,
		handleClick,
		anchorEl,
	}
}
