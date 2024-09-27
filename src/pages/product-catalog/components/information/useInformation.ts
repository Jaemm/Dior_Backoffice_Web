import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { uploadImage, uploadUrl } from 'api/product-catalog'

export const useInformation = () => {
	const { setValue } = useFormContext()
	const [image, setImage] = useState('')

	const putUploadUrl = useMutation(uploadUrl)

	const { mutate, isLoading } = useMutation(uploadImage, {
		onSuccess: data => {
			putUploadUrl.mutate(
				{ url: data.data?.presigned_url, file: image },
				{
					onSuccess: () => {
						setValue('image_url', data.data?.public_url)
					},
				},
			)
		},
	})

	const uploadingImageIsLoading = putUploadUrl.isLoading || isLoading

	const handleUpload = async (e: any) => {
		await setImage(e.target.files[0])
		await mutate({ filename: e.target.files[0]?.name })
	}

	return {
		handleUpload,
		uploadingImageIsLoading,
	}
}
