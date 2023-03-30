import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useToggle } from 'hooks/useToggle'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addRecommendations, editRecommendations } from 'api/product-recommendations'

export interface FormTypes {
	name: string
	preserum?: number
	lotion?: number
	serum?: number
	cream?: number
	eye?: number
	uv?: number
	make1?: number
	make2?: number
	make3?: number
	tabValue?: number
	skin?: string | null
	make?: string | null
	products_selected?: any[]
}

export interface IValue {
	countries: string[]
	id: string
	name: string
	number_of_products: number
	routine: string
	products: {
		category: string
		code: string
		collection: string
		description: string
		id: number
		image_url: string
		link: string
		name: string
		product_type: string
		routine: string
	}[]
	right: string
}

export const defaultValues = {
	name: '',
	skin: null,
	make: null,
	tabValue: 0,
	products_selected: [],
}

const defaultSkin = {
	preserum: {},
	lotion: {},
	serum: {},
	cream: {},
	eye: {},
	uv: {},
}

const defaultMake = { make1: {}, make2: {}, make3: {} }

export const useProForm = (values?: IValue, type?: string, total?: number) => {
	const queryClient = useQueryClient()
	const [value, setValue] = useState(0)
	const [skin, setSkin] = useState(defaultSkin)
	const [make, setMake] = useState(defaultMake)
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const handleSuccess = async () => {
		await queryClient.invalidateQueries(['product-recommendations'])
		await setToggle(false)
		await form.reset(defaultValues)
	}

	const handleChangeSkin = (name: any, value: any) => {
		form.setValue(name, value?.id)
		setSkin({ ...skin, [name]: value })
	}

	const handleChangeMake = (name: any, value: any) => {
		form.setValue(name, value?.id)
		setMake({ ...make, [name]: value })
	}

	const addProduct = useMutation((data: FormTypes) => addRecommendations<FormTypes>(data), {
		onSuccess: handleSuccess,
		onError: (err: any) => {
			notifyError(err.message)
		},
	})

	const editProduct = useMutation(
		(data: FormTypes) => editRecommendations<FormTypes>(data, values?.id),
		{
			onSuccess: handleSuccess,
			onError: (err: any) => {
				notifyError(err.message)
			},
		},
	)

	const onSubmit = (data: FormTypes) => {
		const products_selected =
			values?.routine === 'Makeup'
				? [
						undefined,
						undefined,
						undefined,
						undefined,
						undefined,
						data.make1,
						data.make2,
						data.make3,
				  ]
				: [
						data.preserum,
						data.lotion,
						data.serum,
						data.cream,
						data.eye,
						data.uv,
						undefined,
						undefined,
						undefined,
				  ]

		if (type === 'edit') {
			editProduct.mutate({
				name: data.name,
				products_selected,
			})
		} else {
			addProduct.mutate({
				name: data.name,
				products_selected,
			})
		}
	}

	const handleEdit = () => {
		if (values?.routine === 'Makeup') {
			const make1 = values?.products[0]
			const make2 = values?.products[1]
			const make3 = values?.products[2]
			console.log(values?.products, 'values?.products')
			setMake({
				make1: {
					id: make1?.id,
					code: make1?.code,
					name: make1?.name,
					image_url: make1?.image_url,
				},
				make2: {
					id: make2?.id,
					code: make2?.code,
					name: make2?.name,
					image_url: make2?.image_url,
				},
				make3: {
					id: make3?.id,
					code: make3?.code,
					name: make3?.name,
					image_url: make3?.image_url,
				},
			})
			form.reset({
				name: values?.name!,
				make: values?.id,
				tabValue: 1,
				make1: make1?.id,
				make2: make2?.id,
				make3: make3?.id,
			})
			setValue(1)
		} else {
			const preserums = values?.products.find((v: any) => v?.category === 'Pre-serums')
			const lotions = values?.products.find((v: any) => v?.category === 'Lotions')
			const serums = values?.products.find((v: any) => v?.category === 'Serums')
			const creams = values?.products.find((v: any) => v?.category === 'Creams')
			const eye = values?.products.find((v: any) => v?.category === 'Eye Care')
			const uv = values?.products.find((v: any) => v?.category === 'UV Protection')
			setSkin({
				preserum: {
					id: preserums?.id,
					code: preserums?.code,
					name: preserums?.name,
					image_url: preserums?.image_url,
				},
				lotion: {
					id: lotions?.id,
					code: lotions?.code,
					name: lotions?.name,
					image_url: lotions?.image_url,
				},
				serum: {
					id: serums?.id,
					code: serums?.code,
					name: serums?.name,
					image_url: serums?.image_url,
				},
				cream: {
					id: creams?.id,
					code: creams?.code,
					name: creams?.name,
					image_url: creams?.image_url,
				},
				eye: {
					id: eye?.id,
					code: eye?.code,
					name: eye?.name,
					image_url: eye?.image_url,
				},
				uv: {
					id: uv?.id,
					code: uv?.code,
					name: uv?.name,
					image_url: uv?.image_url,
				},
			})
			form.reset({
				name: values?.name!,
				skin: values?.id,
				tabValue: 0,
				preserum: preserums?.id,
				lotion: lotions?.id,
				serum: serums?.id,
				cream: creams?.id,
				eye: eye?.id,
				uv: uv?.id,
			})
			setValue(0)
		}
	}

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue)
		form.reset({ tabValue: newValue, products_selected: [], name: form.getValues('name') })
	}

	const handleClose = () => {
		setToggle(false)
		form.reset(defaultValues)
		setValue(0)
		setMake(defaultMake)
		setSkin(defaultSkin)
	}

	useEffect(() => {
		if (type === 'edit') {
			handleEdit()
		}
	}, [open])

	const isLoading = editProduct.isLoading || addProduct.isLoading

	return {
		make,
		skin,
		open,
		form,
		value,
		toggle,
		setMake,
		setSkin,
		onSubmit,
		isLoading,
		handleClose,
		handleChange,
		handleChangeSkin,
		handleChangeMake,
	}
}
