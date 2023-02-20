import { useExport } from './useExport'
import { Wrapper, Container } from './style'
import { Countries } from './components/countries'
import { ExportExcel } from 'components/export-excel'
import { Translations } from './components/translations'
import { a11yProps, TabPanel } from 'components/tab-panel'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { Button, Dialog, IconButton, Tab, Tabs } from '@mui/material'
import { ReactComponent as IconExport } from 'assets/icons/export.svg'

interface PropTypes {
	data: any[]
	loading?: boolean
}

export const ExportProduct = ({ data, loading }: PropTypes) => {
	const { open, value, toggle, handleClose, handleChange } = useExport()

	return (
		<>
			<Button startIcon={<IconExport />} disabled={data.length === 0 || loading} onClick={toggle}>
				Export
			</Button>
			<Dialog
				open={open}
				scroll='body'
				onClose={handleClose}
				BackdropProps={{
					style: {
						backdropFilter: 'blur(25px)',
						background: 'rgba(0, 0, 0, 0.5)',
					},
				}}
				PaperProps={{
					style: {
						borderRadius: '20px',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<Container>
					<IconButton onClick={handleClose} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
						<Tab label='Products' {...a11yProps(0)} />
						<Tab label='Countries' {...a11yProps(1)} />
						<Tab label='Translations' {...a11yProps(2)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						<Wrapper>
							<h2>Export selected products</h2>
							<ExportExcel
								title='Download'
								loading={false}
								excelTitle='export'
								data={data.map(v => ({
									'Product Code': v.code,
									'Product Name': v.name,
									Category: v.category,
									Collection: v.collection,
									Axis: v.routine,
									Link: v.link,
									'Image URL': v.image_url,
									'Product Variant Code': v.image_url,
								}))}
							/>
						</Wrapper>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Wrapper>
							<Countries />
						</Wrapper>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Wrapper>
							<Translations />
						</Wrapper>
					</TabPanel>
					<Button variant='outlined' onClick={handleClose}>
						Cancel
					</Button>
				</Container>
			</Dialog>
		</>
	)
}
