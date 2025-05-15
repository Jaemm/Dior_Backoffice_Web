import { Button, Menu, MenuItem } from '@mui/material'
import { ReactComponent as IconExport } from 'assets/icons/export.svg'
import CircularProgress from '@mui/material/CircularProgress'
import { useExcelSelect } from './useExcel'

interface PropTypes {
	header?: string
	title?: string[]
	data: any[]
	loading?: boolean
	excelTitle?: string[]
}

export const ExportSelect = ({
	header = 'Export',
	data,
	loading,
	title = ['', ''],
	excelTitle = ['', ''],
}: PropTypes) => {
	const { handleClick, handleClose, open, anchorEl } = useExcelSelect()

	return (
		<div>
			<Button
				sx={{ maxWidth: '205px', width: '205px' }}
				startIcon={<IconExport />}
				onClick={handleClick}
			>
				{header}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem
					sx={{ width: '205px' }}
					disabled={data[0].length === 0}
					onClick={() => handleClose(data[0], excelTitle[0])}
				>
					<p style={{ fontWeight: 'bold' }}>{title[0]}</p>
				</MenuItem>
				<MenuItem
					disabled={loading || data[1].length === 0}
					onClick={() => handleClose(data[1], excelTitle[1])}
				>
					<div style={{ display: 'flex', gap: '10px' }}>
						<p style={{ fontWeight: 'bold' }}>{title[1]}</p>
						<p>{loading && <CircularProgress style={{ width: '15px', height: '15px' }} />}</p>
					</div>
				</MenuItem>
			</Menu>
		</div>
	)
}
