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
		resSaveFile.mutate({ file_url: data.file_url })
	}

	const handleChange = async (event: any) => {
		await setFileName('')
		const fileUploaded = await event.target.files
		for (let i = 0; i < fileUploaded.length; i++) {
			if (i <= 10) {
				const file: File = await fileUploaded[i]
				const formData = new FormData()
				formData.append('file', file)
				await setFileName(prev => prev + file.name + ';')
				await resUpload.mutateAsync(formData, {
					onSuccess: async data => {
						await form.setValue('file_url', [...form.getValues('file_url'), data.data.url])
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
