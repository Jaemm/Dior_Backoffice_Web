import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'

export const useExcel = () => {
	const handleExcel = (list: any, title: string) => {
		const ws = XLSX.utils.json_to_sheet(list)
		const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
		const excelBuffer = XLSX.write(wb, {
			bookType: 'xlsx',
			type: 'array',
		})
		const blob = new Blob([excelBuffer], { type: fileType })
		FileSaver.saveAs(blob, title + fileExtension)
	}

	return { handleExcel }
}
