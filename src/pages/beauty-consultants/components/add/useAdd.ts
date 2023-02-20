import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postBeautyConsultants } from 'api/beauty-consultants'
import { useToggle } from 'hooks/useToggle'
import { notifyError } from 'components/notify'

export interface FormTypes {
	country?: string
	code: string
	name: string
	consultant_branch_id: number | null
}

export const defaultValues = {
	country: '',
	code: '',
	name: '',
	consultant_branch_id: null,
}

export const useAdd = () => {
	const queryClient = useQueryClient()
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['beauty-consultants'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const handleClose = () => {
		form.reset(defaultValues)
		setToggle(false)
	}

	const { mutate, isLoading } = useMutation(
		(data: FormTypes) => postBeautyConsultants<FormTypes>(data),
		{
			onSuccess: handleSuccess,
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	const onSubmit = (data: FormTypes) => mutate(data)

	return { form, open, toggle, isLoading, onSubmit, handleClose }
}
