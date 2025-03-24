import { useAdd } from './useAdd'
import { Active } from '../active'
import { Input } from 'components/input'
import { Controller } from 'react-hook-form'
import { useCountries } from 'hooks/useCountries'
import { CountrySelect } from 'components/country-select'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { WrapPos, WrapDown, Container, WrapButtons, Placeholder } from './style'
import { Autocomplete, Button, Dialog, FormHelperText, IconButton, TextField } from '@mui/material'

interface IPropsAdd {
	optionsPos: { label: string; value: string }[]
	onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void
	isPOSLoading: boolean
	onChange: any
	isNoOption: boolean
	setCountry: React.Dispatch<React.SetStateAction<string>>
	setPOSValue: React.Dispatch<React.SetStateAction<string>>
}

export const Add = ({
	optionsPos,
	onChangeText,
	isPOSLoading,
	isNoOption,
	setCountry,
	setPOSValue,
}: IPropsAdd) => {
	const { options, isLoading: countryIsLoading } = useCountries()
	const { form, open, toggle, isLoading, onSubmit, handleClose } = useAdd(setCountry, setPOSValue)

	return (
		<>
			<Button onClick={toggle}>Add</Button>
			<Dialog
				open={open}
				scroll='body'
				onClose={handleClose}
				BackdropProps={{
					style: {
						backdropFilter: 'blur(25px)',
						background: 'rgba(0, 0, 0, 0.5)',
					},
				}}
				PaperProps={{
					style: {
						borderRadius: '20px',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<Container>
					<IconButton onClick={handleClose} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<h3>Add Beauty Consultant</h3>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CountrySelect
							name='country'
							options={options}
							control={form.control}
							disabled={countryIsLoading}
							error={!!form.formState.errors.country}
							message={form.formState.errors.country?.message}
						/>
						<WrapPos>
							<label htmlFor='consultant_branch_id'>POS Code</label>

							<Controller
								name='consultant_branch_id'
								control={form.control}
								render={({ field }) => (
									<Autocomplete
										options={optionsPos}
										getOptionLabel={option => option.label}
										isOptionEqualToValue={(option, value) => option.value === value.value}
										size='small'
										noOptionsText={isNoOption ? 'POS not found' : 'Type to see options'}
										id='consultant_branch_id'
										sx={{
											'& .MuiInputBase-root': {
												height: 55,
												alignItems: 'center',
												display: 'flex',
												justifyContent: 'center',
											},
											'& .MuiInputBase-input': { marginTop: '-5px' },
											maxWidth: '410px',
										}}
										clearIcon={false}
										popupIcon={<IconDown />}
										loading={isPOSLoading}
										value={optionsPos.find(option => option.value === String(field.value))}
										onChange={(_, newValue) => field.onChange(newValue?.value)}
										renderOption={(props, option) => (
											<li {...props} key={option.value}>
												{option.label}
											</li>
										)}
										renderInput={params => (
											<TextField {...params} onChange={onChangeText} placeholder='Enter POS' />
										)}
									/>
								)}
							/>
							<FormHelperText error={!!form.formState.errors.consultant_branch_id}>
								{form.formState.errors.consultant_branch_id?.message}
							</FormHelperText>
						</WrapPos>
						<Input
							id='code'
							name='code'
							label='BC Code'
							control={form.control}
							placeholder='Enter Code here'
							error={!!form.formState.errors.code}
							message={form.formState.errors.code?.message}
						/>
						<Input
							id='name'
							name='name'
							label='BC Name'
							control={form.control}
							placeholder='Enter name here'
							error={!!form.formState.errors.name}
							message={form.formState.errors.name?.message}
						/>
						<Active />
						<WrapButtons>
							<Button variant='outlined' onClick={handleClose}>
								Cancel
							</Button>
							<Button disabled={isLoading} type='submit'>
								Save
							</Button>
						</WrapButtons>
					</form>
				</Container>
			</Dialog>
		</>
	)
}
