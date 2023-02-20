import { FormHelperText, MenuItem, Select } from '@mui/material'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { WrapList, WrapDown, Placeholder } from './style'
import { Controller, useFormContext } from 'react-hook-form'
import { AutoCompleteInput } from 'components/autocomplete'

interface IMake {
	values: any
	setValues: any
	group: {
		options: any[]
		products: any[]
	}
	onChange: any
}

export const Make = ({ values, group, setValues, onChange }: IMake) => {
	const form = useFormContext()
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
							IconComponent={props => (
								<WrapDown {...props}>
									<IconDown />
								</WrapDown>
							)}
							onChange={e => {
								const product = group.options.find((v: any) => v.value === e.target.value)
								const fluids = product?.products.find((v: any) => v?.category === 'Fluids')
								const concealer = product?.products.find((v: any) => v?.category === 'Concealer')
								const powders = product?.products.find((v: any) => v?.category === 'Powders')
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
							}}
							renderValue={value => {
								return value === null || value === undefined ? (
									<Placeholder>Select Recommendation</Placeholder>
								) : (
									group.options.find(v => Number(v.value) === Number(value))?.label
								)
							}}
						>
							{group.options.map(({ value, label }) => (
								<MenuItem key={value} value={value}>
									{label}
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
					products={group.products}
				/>
				<AutoCompleteInput
					name='make2'
					routine='Concealer'
					type='Make-up 2'
					value={values.make2}
					onChange={onChange}
					products={group.products}
				/>
				<AutoCompleteInput
					name='make3'
					routine='Powders'
					type='Make-up 3'
					value={values.make3}
					onChange={onChange}
					products={group.products}
				/>
			</WrapList>
		</div>
	)
}
