import {
	Button,
	Checkbox,
	Dialog,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
} from '@mui/material'
import { Input } from 'components/input'
import { Controller } from 'react-hook-form'
import { Spinner } from 'components/spinner'
import { useManForm, IValues } from './useManForm'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { Container, WrapActive, WrapButtons, WrapList } from './style'

interface IForm {
	title: string
	type: 'add' | 'edit'
	buttonTitle: string
	values?: IValues
	ButtonModal: ({ onClick }: { onClick: () => void }) => JSX.Element
}

export const Form = ({ type, title, values, buttonTitle, ButtonModal }: IForm) => {
	const {
		open,
		form,
		toggle,
		onSubmit,
		isLoading,
		resCountry,
		handleClose,
		isAdminWatch,
		allCountries,
		setAllCountries,
	} = useManForm(values, type)

	return (
		<>
			<ButtonModal onClick={toggle} />
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
					<h3>{title}</h3>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Input
							id='name'
							name='name'
							label='First name'
							control={form.control}
							placeholder='Enter name here'
							error={!!form.formState.errors.name}
							message={form.formState.errors.name?.message}
						/>
						<Input
							id='surname'
							name='surname'
							label='Last name'
							control={form.control}
							placeholder='Enter last name here'
							error={!!form.formState.errors.surname}
							message={form.formState.errors.surname?.message}
						/>
						<Input
							id='email'
							name='email'
							type='email'
							label='Email'
							autoComplete='off'
							control={form.control}
							placeholder='Enter email here'
							error={!!form.formState.errors.email}
							message={form.formState.errors.email?.message}
						/>
						<Input
							id='password'
							name='password'
							type='password'
							label='Password'
							autoComplete='off'
							control={form.control}
							placeholder='Enter email here'
							error={!!form.formState.errors.password}
							message={form.formState.errors.password?.message}
						/>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Is Admin?</FormLabel>
							<Controller
								control={form.control}
								name='is_admin'
								render={({ field: { onChange, value, ...rest } }) => (
									<RadioGroup
										{...rest}
										value={String(value)}
										onChange={e => {
											if (e.target.value === 'true') {
												form.setValue('countries', [])
											}
											onChange(e.target.value === 'true')
										}}
									>
										<WrapActive>
											<FormControlLabel value='true' control={<Radio />} label='Yes' />
											<FormControlLabel value='false' control={<Radio />} label='No' />
										</WrapActive>
									</RadioGroup>
								)}
							/>
						</FormControl>
						{isAdminWatch ? null : resCountry.isLoading || resCountry.isFetching ? (
							<Spinner center />
						) : (
							<>
								<p>Please select countries for the user</p>
								<WrapList>
									{allCountries.map((item: any) => (
										<Controller
											name='countries'
											control={form.control}
											key={item.label}
											render={({ field: { onChange } }) => (
												<FormControlLabel
													control={
														<Checkbox
															checked={item.value}
															onChange={(event, i) => {
																if (item.label === 'All') {
																	const newData: any = allCountries.map((v: any) => {
																		return { ...v, value: i }
																	})
																	setAllCountries(newData)
																	onChange(
																		newData
																			.filter((v: any) => v.value && v.label !== 'All')
																			.map((a: any) => a.label),
																	)
																} else {
																	const newData: any = allCountries.map((v: any) => {
																		if (v.label === item.label) {
																			return { ...v, value: i }
																		}
																		return v
																	})
																	const isAll = newData.slice(1).every((e: any) => e.value)
																	setAllCountries([
																		{ label: 'All', value: isAll },
																		...newData.slice(1),
																	])
																	onChange(
																		newData
																			.filter((v: any) => v.value && v.label !== 'All')
																			.map((a: any) => a.label),
																	)
																}
															}}
															name={item.label}
															color='primary'
														/>
													}
													label={item.label}
												/>
											)}
										/>
									))}
								</WrapList>
							</>
						)}
						<WrapButtons>
							<Button variant='outlined' onClick={handleClose}>
								Cancel
							</Button>
							<Button disabled={isLoading} type='submit'>
								{buttonTitle}
							</Button>
						</WrapButtons>
					</form>
				</Container>
			</Dialog>
		</>
	)
}
