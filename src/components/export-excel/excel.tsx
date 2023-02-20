import { Button } from '@mui/material'
import { useExcel } from 'hooks/useExcel'
import { ReactComponent as IconExport } from 'assets/icons/export.svg'

interface PropTypes {
	title?: string
	data: object[]
	loading?: boolean
	excelTitle?: string
}

export const ExportExcel = ({
	data,
	loading,
	title = 'Export',
	excelTitle = 'export',
}: PropTypes) => {
	const { handleExcel } = useExcel()

	return (
		<Button
			startIcon={<IconExport />}
			disabled={data.length === 0 || loading}
			onClick={() => handleExcel(data, excelTitle)}
		>
			{title}
		</Button>
	)
}
