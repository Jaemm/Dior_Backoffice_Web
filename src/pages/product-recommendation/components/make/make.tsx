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

										const make1 = products[0]
										const make2 = products[1]
										const make3 = products[2]
										form.setValue('make1', make1?.id)
										form.setValue('make2', make2?.id)
										form.setValue('make3', make3?.id)

										const values = {
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
					routine='Makeup'
					type='Make-up 1'
					value={values.make1}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='make2'
					routine='Makeup'
					type='Make-up 2'
					value={values.make2}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
				<AutoCompleteInput
					name='make3'
					routine='Makeup'
					type='Make-up 3'
					value={values.make3}
					onChange={onChange}
					loading={isLoadingMutate}
				/>
			</WrapList>
		</div>
	)
}
