import { Button } from '@mui/material'
import { useUpload } from './useUpload'
import { Wrap, Container, FormButtons } from './style'

export interface IUpload {
	onClose: () => void
}

export const UploadInput = ({ onClose }: IUpload) => {
	const {
		ref,
		form,
		fileName,
		onSubmit,
		resFilePut,
		resUpload,
		resSaveFile,
		handleClick,
		handleChange,
		handleCancel,
	} = useUpload({
		onClose,
	})

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Container>
				<label htmlFor='upload-file'>
					Please select product pictures to upload (no more than 10)
				</label>
				<Wrap>
					<div className='title'>{fileName}</div>
					<input
						multiple
						ref={ref}
						type='file'
						id='upload-file'
						name='upload-file'
						onChange={handleChange}
						style={{ display: 'none' }}
						accept='image/bmp, image/png, image/jpg'
					/>
					<Button disabled={resUpload.isLoading || resFilePut.isLoading} onClick={handleClick}>
						Browse
					</Button>
				</Wrap>
				<div className='error'>
					{form.formState.errors.file_url ? form.formState.errors.file_url?.message : ''}
				</div>
			</Container>
			<FormButtons>
				<Button onClick={handleCancel} variant='outlined'>
					Cancel
				</Button>
				<Button
					disabled={resSaveFile.isLoading || resUpload.isLoading || resFilePut.isLoading}
					type='submit'
				>
					Upload
				</Button>
			</FormButtons>
		</form>
	)
}
