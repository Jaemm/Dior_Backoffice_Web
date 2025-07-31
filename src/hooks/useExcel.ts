import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'

export const useExcel = () => {
	const handleExcel = (list: any[], title: string) => {
		if (!list || list.length === 0) return

		const ws = XLSX.utils.json_to_sheet(list)

		const colWidths = Object.keys(list[0]).map(key => {
			const maxLength = Math.max(
				key.length,
				...list.map(item => (item[key] ? item[key].toString().length : 0)),
			)
			return { wch: maxLength + 2 }
		})
		ws['!cols'] = colWidths

		const sheetName = title.substring(0, 31) || 'Sheet1'

		const wb = {
			Sheets: { [sheetName]: ws },
			SheetNames: [sheetName],
		}

		const excelBuffer = XLSX.write(wb, {
			bookType: 'xlsx',
			type: 'array',
		})
		const blob = new Blob([excelBuffer], { type: fileType })
		FileSaver.saveAs(blob, `${title}${fileExtension}`)
	}

	return { handleExcel }
}
