import { schema } from './form.schema'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { filePut, saveFile, saveFileImages, uploadFile } from 'api/upload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUpload } from './upload'
import { notifyError, notifySuccess } from 'components/notify'

export interface FormTypes {
	file_url: any[]
}

export const defaultValues = {
	file_url: [],
}

const defaulteFileName = 'Link here'

export const useUpload = ({ onClose }: IUpload) => {
	const queryClient = useQueryClient()
	const ref = useRef<HTMLInputElement>(null)
	const [fileName, setFileName] = useState(defaulteFileName)

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const resFilePut = useMutation(filePut, {
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})
	const resUpload = useMutation(uploadFile, {
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})
	const resSaveFile = useMutation(saveFileImages, {
		onSuccess: data => {
			queryClient.invalidateQueries(['product-catalog-list'])
			form.reset(defaultValues)
			setFileName(defaulteFileName)
			notifySuccess(data.data.message)
			onClose()
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
	})

	const handleClick = () => {
		if (ref.current) ref.current.click()
	}

	const handleCancel = () => {
		form.reset(defaultValues)
		setFileName(defaulteFileName)
		onClose()
	}

	const onSubmit = (data: FormTypes) => {
		resSaveFile.mutate({ file_urls: data.file_url })
	}

	const handleChange = async (event: any) => {
		await setFileName('')
		const fileUploaded = await event.target.files
		for (let i = 0; i < fileUploaded.length; i++) {
			if (i <= 10) {
				const file = await fileUploaded[i]
				await setFileName(prev => prev + file.name + ';')
				await resUpload.mutateAsync(file.name, {
					onSuccess: async data => {
						await form.setValue('file_url', [...form.getValues('file_url'), data.data.public_url])
						await resFilePut.mutate({
							url: data.data.presigned_url,
							file: fileUploaded[i],
						})
					},
				})
			}
		}
	}

	return {
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
	}
}
