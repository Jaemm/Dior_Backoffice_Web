import { useSkin } from './useSkin'
import { Spinner } from 'components/spinner'
import { WrapDown, WrapList, Placeholder } from './style'
import { AutoCompleteInput } from 'components/autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { FormHelperText, MenuItem, Select } from '@mui/material'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'

interface ISkin {
	values: any
	setValues: any
	onChange: any
}

export const Skin = ({ values, setValues, onChange }: ISkin) => {
	const form = useFormContext()
	const { data, mutate, isLoading, isLoadingMutate } = useSkin()

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
							disabled={isLoading || isLoadingMutate}
							MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
							IconComponent={props => (
								<WrapDown {...props}>
									{isLoading || isLoadingMutate ? <Spinner /> : <IconDown />}
								</WrapDown>
							)}
							onChange={e => {
								mutate(e.target.value, {
									onSuccess: data => {
										const products = data.data.products
										const preserums = products.find((v: any) => v?.category === 'Pre-serums')
										const lotions = products.find((v: any) => v?.category === 'Lotions')
										const serums = products.find((v: any) => v?.category === 'Serums')
										const creams = products.find((v: any) => v?.category === 'Creams')
										const eye = products.find((v: any) => v?.category === 'Eye Care')
										const uv = products.find((v: any) => v?.category === 'UV Protection')
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
									},
								})
								onChange(e)
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
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='lotion'
					type='Lotion'
					routine='Lotions'
					value={values.lotion}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='serum'
					type='Serum'
					routine='Serums'
					value={values.serum}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='cream'
					type='Cream'
					routine='Creams'
					value={values.cream}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='eye'
					type='Eye'
					routine='Eye Care'
					value={values.eye}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='uv'
					type='UV'
					routine='UV Protection'
					value={values.uv}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
			</WrapList>
		</div>
	)
}
