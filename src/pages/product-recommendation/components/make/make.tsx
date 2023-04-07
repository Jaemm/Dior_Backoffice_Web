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
										const primer = products.find((v: any) => v?.category === 'Primer')
										const fluids = products.find((v: any) => v?.category === 'Fluids')
										const cushions = products.find((v: any) => v?.category === 'Cushions')
										const concealer = products.find((v: any) => v?.category === 'Concealer')
										const powders = products.find((v: any) => v?.category === 'Powders')
										const spray = products.find((v: any) => v?.category === 'Setting Spray')

										form.setValue('primer', primer?.id)
										form.setValue('fluids', fluids?.id)
										form.setValue('cushions', cushions?.id)
										form.setValue('concealer', concealer?.id)
										form.setValue('powders', powders?.id)
										form.setValue('spray', spray?.id)
										const values = {
											primer: {
												id: primer?.id,
												code: primer?.code,
												name: primer?.name,
												image_url: primer?.image_url,
											},
											fluids: {
												id: fluids?.id,
												code: fluids?.code,
												name: fluids?.name,
												image_url: fluids?.image_url,
											},
											cushions: {
												id: cushions?.id,
												code: cushions?.code,
												name: cushions?.name,
												image_url: cushions?.image_url,
											},
											concealer: {
												id: concealer?.id,
												code: concealer?.code,
												name: concealer?.name,
												image_url: concealer?.image_url,
											},
											powders: {
												id: powders?.id,
												code: powders?.code,
												name: powders?.name,
												image_url: powders?.image_url,
											},
											spray: {
												id: spray?.id,
												code: spray?.code,
												name: spray?.name,
												image_url: spray?.image_url,
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
					name='primer'
					routine='Makeup'
					type='Primer'
					filter_by='Primer'
					value={values.primer}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='fluids'
					routine='Makeup'
					type='Fluids'
					filter_by='Fluids'
					value={values.fluids}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='cushions'
					routine='Makeup'
					type='Cushions'
					filter_by='Cushions'
					value={values.cushions}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='concealer'
					routine='Makeup'
					type='Concealer'
					filter_by='Concealer'
					value={values.concealer}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='powders'
					routine='Makeup'
					type='Powders'
					filter_by='Powders'
					value={values.powders}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='spray'
					routine='Makeup'
					type='Setting Spray'
					filter_by='Setting Spray'
					value={values.spray}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
			</WrapList>
		</div>
	)
}
