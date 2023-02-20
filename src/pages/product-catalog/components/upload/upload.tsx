import { Container } from './style'
import { useUpload } from './useUpload'
import { Products } from './components/products'
import { Countries } from './components/countries'
import { Translations } from './components/translations'
import { a11yProps, TabPanel } from 'components/tab-panel'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { Button, Dialog, IconButton, Tab, Tabs } from '@mui/material'
import { UploadInput } from './components/upload-input'

export const Upload = () => {
	const { open, value, toggle, handleClose, handleChange } = useUpload()

	return (
		<>
			<Button onClick={toggle}>Upload</Button>
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
						<Tab label='Pictures' {...a11yProps(1)} />
						<Tab label='Countries' {...a11yProps(2)} />
						<Tab label='Translations' {...a11yProps(3)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						<Products onClose={handleClose} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<UploadInput onClose={handleClose} />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Countries onClose={handleClose} />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Translations onClose={handleClose} />
					</TabPanel>
				</Container>
			</Dialog>
		</>
	)
}
