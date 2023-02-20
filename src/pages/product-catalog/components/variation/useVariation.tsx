import { WrapButtons } from './style'
import { schema } from './form.schema'
import { deleteData } from 'api/delete'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToggle } from 'hooks/useToggle'
import { yupResolver } from '@hookform/resolvers/yup'
import { TableColumn } from 'react-data-table-component'
import { DataRowProductCatalog } from 'types/product-catalog'
import { notifyError, notifySuccess } from 'components/notify'
import { ReactComponent as IconEdit } from 'assets/icons/edit.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconDelete } from 'assets/icons/delete.svg'
import { postProductCatalog, pustProductCatalog, uploadImage, uploadUrl } from 'api/product-catalog'

export interface FormTypes {
	category: string
	code: string
	collection: string
	image_url?: string
	link?: string
	name: string
	routine: string
	id?: number
}

export type DataRow = {
	category: string
	code: string
	collection: string
	description: string
	id: number
	image_url: string
	link: string
	name: string
	product_recommendation_id: number
	product_type: string
	routine: string
	shades: string
}

export const defaultValues = {
	code: '',
	name: '',
	link: '',
	category: '',
	collection: '',
	routine: '',
	image_url: '',
}

export const useVariation = (values: DataRowProductCatalog) => {
	const queryClient = useQueryClient()
	const [image, setImage] = useState('')
	const [open, toggle, setToggle] = useToggle()
	const [type, setType] = useState('')

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['product-catalog-list'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const putUploadUrl = useMutation(uploadUrl)

	const resUploadImage = useMutation(uploadImage, {
		onSuccess: data => {
			putUploadUrl.mutate(
				{ url: data.data?.presigned_url, file: image },
				{
					onSuccess: () => {
						form.setValue('image_url', data.data?.public_url)
					},
				},
			)
		},
	})

	const uploadingImageIsLoading = putUploadUrl.isLoading || resUploadImage.isLoading

	const handleUpload = async (e: any) => {
		await setImage(e.target.files[0])
		await resUploadImage.mutate({ filename: e.target.files[0]?.name })
	}

	const addPost = useMutation((data: any) => postProductCatalog<any>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const editPost = useMutation(
		(data: any) => {
			return pustProductCatalog<any>(data, data.id)
		},
		{
			onSuccess: handleSuccess,
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	const resSeleteData = useMutation(deleteData, {
		onSuccess: data => {
			setToggle(false)
			notifySuccess(data.data.message)
			queryClient.invalidateQueries(['product-catalog-list'])
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleDelete = (id: number[]) => {
		resSeleteData.mutate({ type: 'product_recommendations', ids: id })
	}

	const handleEdit = (row: DataRow) => {
		setType('edit')
		form.reset(row)
		setToggle(true)
	}

	const handleAdd = () => {
		setType('add')
		setToggle(true)
		form.reset(defaultValues)
	}

	const handleCancel = () => {
		setToggle(false)
		form.reset(defaultValues)
	}

	const onSubmit = (data: FormTypes) => {
		if (type === 'edit') {
			editPost.mutate({
				...data,
				product_recommendation_id: values.id,
				product_translations: values.product_translations,
				countries: values.countries,
			})
		} else {
			addPost.mutate({
				...data,
				product_recommendation_id: values.id,
				product_translations: values.product_translations,
				countries: values.countries,
			})
		}
	}

	const columns: TableColumn<DataRow>[] = useMemo(
		() => [
			{
				name: 'Variant',
				selector: row => row.name,
				center: true,
				width: '150px',
			},
			{
				name: 'Code',
				selector: row => row.code,
				center: true,
				width: '150px',
			},
			{
				name: 'Category',
				selector: row => row.category,
				center: true,
			},
			{
				name: 'Collection',
				selector: row => row.collection,
				center: true,
			},

			{
				name: '',
				selector: row => row.id,
				width: '70px',
				cell: row => (
					<WrapButtons>
						<button className='edit' onClick={() => handleEdit(row)}>
							<IconEdit />
						</button>
						<button className='delete' onClick={() => handleDelete([row.id])}>
							<IconDelete />
						</button>
					</WrapButtons>
				),
			},
		],
		[],
	)

	const isLoading = editPost.isLoading || addPost.isLoading

	return {
		open,
		form,
		type,
		toggle,
		columns,
		onSubmit,
		isLoading,
		handleAdd,
		handleCancel,
		handleUpload,
		uploadingImageIsLoading,
	}
}
