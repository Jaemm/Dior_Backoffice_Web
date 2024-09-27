import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { uploadImage, uploadUrl } from 'api/product-catalog'

export const useInformation = () => {
	const { setValue } = useFormContext()
	const [image, setImage] = useState<File | undefined>(undefined)

	const putUploadUrl = useMutation(uploadUrl)

	const { mutate, isLoading } = useMutation(uploadImage, {
		onSuccess: data => {
			if (data.data?.url) {
				setValue('image_url', 'https://' + data.data?.url)
			}
		},
	})

	const uploadingImageIsLoading = putUploadUrl.isLoading || isLoading

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImage(file)
			const formData = new FormData()
			formData.append('file', file)
			await mutate(formData)
		}
	}
	return {
		handleUpload,
		uploadingImageIsLoading,
	}
}
