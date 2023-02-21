import { Spinner } from 'components/spinner'
import { WrapDown, WrapList, Placeholder } from './style'
import { AutoCompleteInput } from 'components/autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { FormHelperText, MenuItem, Select } from '@mui/material'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'

interface ISkin {
	values: any
	setValues: any
	group: {
		options: any[]
		products: any[]
	}
	onChange: any
	isLoading: boolean
}

export const Skin = ({ values, group, setValues, onChange, isLoading }: ISkin) => {
	const form = useFormContext()

	return (
		<div>
			<div>
				<label htmlFor='skin'>Select Recommendation</label>
				<Controller
					name='skin'
					control={form.control}
					render={({ field: { onChange, ...rest } }) => (
						<Select
							id='skin'
							{...rest}
							fullWidth
							displayEmpty
							labelId='skin'
							disabled={isLoading}
							MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
							IconComponent={props => (
								<WrapDown {...props}>{isLoading ? <Spinner /> : <IconDown />}</WrapDown>
							)}
							onChange={e => {
								const product = group.options.find(v => v.value === e.target.value)
								const preserums = product?.products.find((v: any) => v?.category === 'Pre-serums')
								const lotions = product?.products.find((v: any) => v?.category === 'Lotions')
								const serums = product?.products.find((v: any) => v?.category === 'Serums')
								const creams = product?.products.find((v: any) => v?.category === 'Creams')
								const eye = product?.products.find((v: any) => v?.category === 'Eye Care')
								const uv = product?.products.find((v: any) => v?.category === 'UV Protection')
								form.setValue('preserum', preserums?.id)
								form.setValue('lotion', lotions?.id)
								form.setValue('serum', serums?.id)
								form.setValue('cream', creams?.id)
								form.setValue('eye', eye?.id)
								form.setValue('uv', uv?.id)
								const values = {
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
				<FormHelperText error={!!form.formState.errors.skin}>
					{form.formState.errors.skin?.message as string}
				</FormHelperText>
			</div>
			<WrapList>
				<AutoCompleteInput
					name='preserum'
					type='Pre-serums'
					routine='Pre-serums'
					value={values.preserum}
					onChange={onChange}
					products={group.products}
				/>
				<AutoCompleteInput
					name='lotion'
					type='Lotion'
					routine='Lotions'
					value={values.lotion}
					onChange={onChange}
					products={group.products}
				/>
				<AutoCompleteInput
					name='serum'
					type='Serum'
					routine='Serums'
					value={values.serum}
					onChange={onChange}
					products={group.products}
				/>
				<AutoCompleteInput
					name='cream'
					type='Cream'
					routine='Creams'
					value={values.cream}
					onChange={onChange}
					products={group.products}
				/>
				<AutoCompleteInput
					name='eye'
					type='Eye'
					routine='Eye Care'
					value={values.eye}
					onChange={onChange}
					products={group.products}
				/>
				<AutoCompleteInput
					name='uv'
					type='UV'
					routine='UV Protection'
					value={values.uv}
					onChange={onChange}
					products={group.products}
				/>
			</WrapList>
		</div>
	)
}
