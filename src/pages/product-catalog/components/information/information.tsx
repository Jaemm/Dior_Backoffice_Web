import { Button } from '@mui/material'
import { Input } from 'components/input'
import { Select } from 'components/select'
import { Spinner } from 'components/spinner'
import { useCategory } from 'hooks/useCategory'
import { optionRoutine } from 'constants/routine'
import { useInformation } from './useInformation'
import { useCollection } from 'hooks/useCollection'
import { useFormContext, useWatch } from 'react-hook-form'
import { Container, LabelUpload, WrapButtons } from './style'
import { ReactComponent as IconUploadImage } from 'assets/icons/upload-image.svg'

interface IInfo {
	onNext: (e: number) => void
	onClose: () => void
}

export const Information = ({ onNext, onClose }: IInfo) => {
	const form = useFormContext()
	const { optionsCategory, categoryIsLoading } = useCategory()
	const { optionsCollection, collectionIsLoading } = useCollection()
	const image_url = useWatch({ name: 'image_url', control: form.control })
	const { handleUpload, uploadingImageIsLoading } = useInformation()

	return (
		<Container>
			<div className='first'>
				<Input
					id='code'
					name='code'
					label='Product code'
					control={form.control}
					placeholder='Enter product code'
					error={!!form.formState.errors.code}
					message={form.formState.errors.code?.message}
				/>
				<Input
					id='name'
					name='name'
					label='Product name'
					control={form.control}
					placeholder='Enter product name'
					error={!!form.formState.errors.name}
					message={form.formState.errors.name?.message}
				/>
			</div>
			<Input
				id='link'
				name='link'
				label='Product link'
				control={form.control}
				placeholder='Enter URL'
				error={!!form.formState.errors.link}
				message={form.formState.errors.link?.message}
			/>
			<div className='second'>
				<Select
					id='category'
					name='category'
					label='Category'
					control={form.control}
					options={optionsCategory}
					isLoading={categoryIsLoading}
					error={!!form.formState.errors.category}
					message={form.formState.errors.category?.message}
				/>
				<Select
					id='collection'
					name='collection'
					label='Collection'
					control={form.control}
					options={optionsCollection}
					isLoading={collectionIsLoading}
					error={!!form.formState.errors.collection}
					message={form.formState.errors.collection?.message}
				/>
			</div>
			<Select
				id='axis'
				name='routine'
				label='Axis'
				control={form.control}
				options={optionRoutine}
				error={!!form.formState.errors.routine}
				message={form.formState.errors.routine?.message}
			/>
			<div className='second end'>
				<LabelUpload htmlFor='image'>
					<div className='label'>Uploaded Image</div>
					{uploadingImageIsLoading && (
						<div className='wrapSpinner'>
							<Spinner center />
						</div>
					)}
					{image_url === '' ? (
						<>
							<IconUploadImage />
						</>
					) : (
						<>
							<img src={image_url} width='100%' height='100%' alt='image.png' />
						</>
					)}
					<input
						id='image'
						type='file'
						accept='image/*'
						onChange={handleUpload}
						disabled={uploadingImageIsLoading}
					/>
				</LabelUpload>
				<WrapButtons>
					<Button onClick={onClose} variant='outlined'>
						Cancel
					</Button>
					<Button onClick={() => onNext(1)}>Next</Button>
				</WrapButtons>
			</div>
		</Container>
	)
}
