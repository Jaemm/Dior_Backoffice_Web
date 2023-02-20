import { Button } from '@mui/material'
import { Input } from 'components/input'
import { Table } from 'components/table'
import { Select } from 'components/select'
import { useWatch } from 'react-hook-form'
import { Spinner } from 'components/spinner'
import { useCategory } from 'hooks/useCategory'
import { optionRoutine } from 'constants/routine'
import { useCollection } from 'hooks/useCollection'
import { DataRow, useVariation } from './useVariation'
import { DataRowProductCatalog } from 'types/product-catalog'
import { ReactComponent as IconUploadImage } from 'assets/icons/upload-image.svg'
import { Form, Container, LabelUpload, WrapNewButton, WrapButtonsSubmit } from './style'

export const Variation = (values: DataRowProductCatalog) => {
	const { optionsCategory, categoryIsLoading } = useCategory()
	const { optionsCollection, collectionIsLoading } = useCollection()
	const {
		open,
		form,
		type,
		columns,
		onSubmit,
		isLoading,
		handleAdd,
		handleCancel,
		handleUpload,
		uploadingImageIsLoading,
	} = useVariation(values)
	const image_url = useWatch({ name: 'image_url', control: form.control })

	return (
		<>
			{open ? (
				<Form onSubmit={form.handleSubmit(onSubmit)}>
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
						<WrapButtonsSubmit>
							<Button onClick={handleCancel} variant='outlined'>
								Cancel
							</Button>
							<Button disabled={isLoading} type='submit'>
								{type === 'add' ? 'Add' : 'Update'}
							</Button>
						</WrapButtonsSubmit>
					</div>
				</Form>
			) : (
				<>
					<WrapNewButton>
						<Button onClick={handleAdd}>Add New Variant</Button>
					</WrapNewButton>
					<Container>
						<Table<DataRow>
							keyField='id'
							withOutPagination
							columns={columns}
							isLoading={false}
							isFetching={false}
							isSelectableRows={false}
							data={values.product_variants}
						/>
					</Container>
				</>
			)}
		</>
	)
}
