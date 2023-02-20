import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useToggle } from 'hooks/useToggle'
import { postCountries } from 'api/countries'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface FormTypes {
	code: string
	name: string
	default_recommendation: string
}

export const defaultValues = {
	code: '',
	name: '',
	default_recommendation: '',
}

export const optionsRecommendation = [
	{ label: 'Recommendation Europe', value: 'Recommendation Europe' },
	{ label: 'Recommendation Asia', value: 'Recommendation Asia' },
	{ label: 'Recommendation Japan', value: 'Recommendation Japan' },
]

export const useAdd = () => {
	const queryClient = useQueryClient()
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['all-countries'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const handleClose = () => {
		setToggle(false)
		form.reset(defaultValues)
	}

	const resAdd = useMutation((data: FormTypes) => postCountries<FormTypes>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const onSubmit = (data: FormTypes) => {
		resAdd.mutate(data)
	}

	return { open, form, resAdd, toggle, setToggle, onSubmit, handleClose }
}
