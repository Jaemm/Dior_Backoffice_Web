import { schema } from './form.schema'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { filePut, saveFile, uploadFile } from 'api/upload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUpload } from './upload'
import { notifyError, notifySuccess } from 'components/notify'

export interface FormTypes {
	file_url: string
	country?: string
	withCountry?: boolean
}

export const defaultValues = {
	file_url: '',
	country: '',
	withCountry: false,
}

const defaulteFileName = 'Link here'

export const useUpload = ({ type, onClose, importDior, withCountry, keyQuery }: IUpload) => {
	const queryClient = useQueryClient()
	const ref = useRef<HTMLInputElement>(null)
	const [fileName, setFileName] = useState(defaulteFileName)

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	useEffect(() => {
		if (withCountry) form.setValue('withCountry', withCountry)
	}, [])

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
	const resSaveFile = useMutation(saveFile, {
		onSuccess: data => {
			if (keyQuery) {
				queryClient.invalidateQueries([keyQuery])
			}
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
		resSaveFile.mutate({
			type,
			file_url: data.file_url,
			importDior,
			country: form.getValues('withCountry') ? form.getValues('country') : undefined,
		})
	}

	const handleChange = async (event: any) => {
		const fileUploaded = await event.target.files[0]
		await setFileName(fileUploaded.name)
		await resUpload.mutate(fileUploaded.name, {
			onSuccess: data => {
				form.setValue('file_url', data.data.public_url)
				resFilePut.mutate({
					url: data.data.presigned_url,
					file: fileUploaded,
				})
			},
		})
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
