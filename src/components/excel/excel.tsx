import { Button } from '@mui/material'
import { ReactComponent as IconExport } from 'assets/icons/export.svg'
import { useExcel } from 'hooks/useExcel'
import { Container } from './style'

interface IExcel {
	title: string
	data: any
}

export const Excel = ({ data, title }: IExcel) => {
	const { handleExcel } = useExcel()

	return (
		<Container>
			<h6>Please download sample file</h6>
			<Button onClick={() => handleExcel(data, title)} startIcon={<IconExport />}>
				Download
			</Button>
		</Container>
	)
}
