import { schema } from './form.schema'
import { useForm } from 'react-hook-form'
import { useToggle } from 'hooks/useToggle'
import { notifyError } from 'components/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addRecommendations, editRecommendations, productGroups } from 'api/product-recommendations'

export interface FormTypes {
	name: string
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

export const useProForm = (values?: IValue, type?: string) => {
	const queryClient = useQueryClient()
	const [value, setValue] = useState(0)
	const [skin, setSkin] = useState({
		lotion: {},
		serum: {},
		cream: {},
		eye: {},
		uv: {},
	})
	const [make, setMake] = useState({ make1: {}, make2: {}, make3: {} })
	const [open, toggle, setToggle] = useToggle()

	const form = useForm<FormTypes>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	})

	const {
		data: groups = {
			skin: {
				options: [],
				products: [],
			},
			make: {
				options: [],
				products: [],
			},
		},
	} = useQuery(['product-groups'], productGroups, {
		select: data => {
			const setSkin = new Set()
			const setMake = new Set()
			const products = data.data.data
				.map((v: any) => v.products)
				.flat(2)
				.map((p: any) => ({
					id: p.id,
					name: p.name,
					code: p.code,
					image_url: p.image_url,
					category: p.category,
				}))

			const optionSkin = data.data.data
				.filter((v: any) => v.products[0]?.routine === 'Skincare')
				.map((v: any) => {
					v.products.map((m: any) => setSkin.add(m.id))
					return { ...v, label: v?.name, value: v.id }
				})
			const optionMake = data.data.data
				.filter((v: any) => v.products[0]?.routine === 'Makeup')
				.map((v: any) => {
					v.products.map((m: any) => setMake.add(m.id))
					return { ...v, label: v?.name, value: v.id }
				})

			const productsofSkin = Array.from(setSkin, v => products.find((p: any) => v === p.id))
			const productsofMake = Array.from(setMake, v => products.find((p: any) => v === p.id))

			const skin = {
				options: optionSkin,
				products: productsofSkin,
			}
			const make = {
				options: optionMake,
				products: productsofMake,
			}

			return { ...data.data, skin, make }
		},
		onError: (err: any) => {
			notifyError(err.response.data.error)
		},
		keepPreviousData: true,
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
				: [data.lotion, data.serum, data.cream, data.eye, data.uv, undefined, undefined, undefined]

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
			const fluids = values?.products.find((v: any) => v?.category === 'Fluids')
			const concealer = values?.products.find((v: any) => v?.category === 'Concealer')
			const powders = values?.products.find((v: any) => v?.category === 'Powders')

			setMake({
				make1: {
					id: fluids?.id,
					code: fluids?.code,
					name: fluids?.name,
					image_url: fluids?.image_url,
				},
				make2: {
					id: concealer?.id,
					code: concealer?.code,
					name: concealer?.name,
					image_url: concealer?.image_url,
				},
				make3: {
					id: powders?.id,
					code: powders?.code,
					name: powders?.name,
					image_url: powders?.image_url,
				},
			})
			form.reset({
				name: values?.name!,
				make: values?.id,
				tabValue: 1,
				make1: fluids?.id,
				make2: concealer?.id,
				make3: powders?.id,
			})
			setValue(1)
		} else {
			const lotions = values?.products.find((v: any) => v?.category === 'Lotions')
			const serums = values?.products.find((v: any) => v?.category === 'Serums')
			const creams = values?.products.find((v: any) => v?.category === 'Creams')
			const eye = values?.products.find((v: any) => v?.category === 'Eye Care')
			const uv = values?.products.find((v: any) => v?.category === 'UV Protection')
			setSkin({
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
		groups,
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
