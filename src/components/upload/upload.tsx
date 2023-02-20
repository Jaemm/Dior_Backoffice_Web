import { diorTypes } from 'types'
import { Container } from './style'
import { Excel } from 'components/excel'
import { useToggle } from 'hooks/useToggle'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { Button, Dialog, IconButton, Divider } from '@mui/material'
import { UploadInput } from 'components/upload-input'

interface IUpload {
	label: string
	type: diorTypes
	title: string
	file?: any[]
	keyQuery?: string
}

export const Upload = ({ label, type, title, file, keyQuery }: IUpload) => {
	const [open, toggle] = useToggle()

	return (
		<>
			<Button onClick={toggle}>Upload</Button>
			<Dialog
				open={open}
				scroll='body'
				onClose={toggle}
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
					<IconButton onClick={toggle} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<h3>{title}</h3>
					<Excel data={file} title={`sample-${type}`} />
					<Divider className='divider' />
					<UploadInput label={label} type={type} onClose={toggle} keyQuery={keyQuery} />
				</Container>
			</Dialog>
		</>
	)
}
