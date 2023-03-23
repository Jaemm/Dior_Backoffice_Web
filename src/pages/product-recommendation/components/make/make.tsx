import { useMake } from './useMake'
import { Spinner } from 'components/spinner'
import { WrapList, WrapDown, Placeholder } from './style'
import { AutoCompleteInput } from 'components/autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { FormHelperText, MenuItem, Select } from '@mui/material'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'

interface IMake {
	values: any
	setValues: any
	onChange: any
}

export const Make = ({ values, setValues, onChange }: IMake) => {
	const form = useFormContext()
	const { data, mutate, isLoading, isLoadingMutate } = useMake()

	return (
		<div>
			<div>
				<label htmlFor='make'>Select Recommendation</label>
				<Controller
					name='make'
					control={form.control}
					render={({ field: { onChange, ...rest } }) => (
						<Select
							id='make'
							{...rest}
							fullWidth
							displayEmpty
							labelId='make'
							disabled={isLoading || isLoadingMutate}
							IconComponent={props => (
								<WrapDown {...props}>
									{isLoading || isLoadingMutate ? <Spinner /> : <IconDown />}
								</WrapDown>
							)}
							MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
							onChange={e => {
								mutate(e.target.value, {
									onSuccess: data => {
										const products = data.data.products
										const fluids = products.find((v: any) => v?.category === 'Fluids')
										const concealer = products.find((v: any) => v?.category === 'Concealer')
										const powders = products.find((v: any) => v?.category === 'Powders')
										form.setValue('make1', fluids?.id)
										form.setValue('make2', concealer?.id)
										form.setValue('make3', powders?.id)
										const values = {
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
										}
										setValues(values)
										onChange(e)
									},
								})
							}}
							renderValue={value => {
								return value === null || value === undefined ? (
									<Placeholder>Select Recommendation</Placeholder>
								) : (
									data.find((v: any) => Number(v.id) === Number(value))?.name
								)
							}}
						>
							{data.map(({ id, name }: any) => (
								<MenuItem key={id} value={id}>
									{name}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				<FormHelperText error={!!form.formState.errors.make}>
					{form.formState.errors.make?.message as string}
				</FormHelperText>
			</div>
			<WrapList>
				<AutoCompleteInput
					name='make1'
					routine='Fluids'
					type='Make-up 1'
					value={values.make1}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='make2'
					routine='Concealer'
					type='Make-up 2'
					value={values.make2}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='make3'
					routine='Powders'
					type='Make-up 3'
					value={values.make3}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
			</WrapList>
		</div>
	)
}
