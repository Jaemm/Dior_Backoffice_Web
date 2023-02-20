import { Input } from 'components/input'
import { useToggle } from 'hooks/useToggle'
import { IValue, useBrand } from './useBrand'
import { Container, WrapButtons } from './style'
import { useCountries } from 'hooks/useCountries'
import { CountrySelect } from 'components/country-select/select'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { ReactComponent as IconEyeOpen } from 'assets/icons/eye-open.svg'
import { Button, Dialog, IconButton, InputAdornment } from '@mui/material'
import { ReactComponent as IconEyeClose } from 'assets/icons/eye-close.svg'

interface IBrandDetails {
	title: string
	type: 'add' | 'edit'
	buttonTitle: string
	values?: IValue
	ButtonModal: ({ onClick }: { onClick: () => void }) => JSX.Element
}

export const FormBrandDetails = ({
	type,
	title,
	values,
	ButtonModal,
	buttonTitle,
}: IBrandDetails) => {
	const { options, isLoading: countryIsLoading } = useCountries()
	const [passwordOpen, passwordToggle] = useToggle()
	const { open, form, toggle, onSubmit, resAddPos, handleClose, resUpdatePos } = useBrand(
		values,
		type,
	)

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
						<CountrySelect
							name='country'
							options={options}
							control={form.control}
							disabled={countryIsLoading}
							error={!!form.formState.errors.country}
							message={form.formState.errors.country?.message}
						/>
						<Input
							id='code'
							name='code'
							label='POS Code'
							control={form.control}
							placeholder='Enter Code here'
							error={!!form.formState.errors.code}
							message={form.formState.errors.code?.message}
						/>
						<Input
							id='name'
							name='name'
							label='POS Name'
							control={form.control}
							placeholder='Enter Name here'
							error={!!form.formState.errors.name}
							message={form.formState.errors.name?.message}
						/>
						<Input
							id='email'
							name='email'
							type='email'
							label='POS email'
							control={form.control}
							placeholder='Enter Email here'
							error={!!form.formState.errors.email}
							message={form.formState.errors.email?.message}
						/>
						<Input
							id='password'
							name='password'
							type={passwordOpen ? 'text' : 'password'}
							label='Password'
							control={form.control}
							autoComplete='new-password'
							placeholder='Enter Password here'
							error={!!form.formState.errors.password}
							message={form.formState.errors.password?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										{passwordOpen ? (
											<IconButton disableRipple onClick={passwordToggle}>
												<IconEyeOpen />
											</IconButton>
										) : (
											<IconButton disableRipple onClick={passwordToggle}>
												<IconEyeClose />
											</IconButton>
										)}
									</InputAdornment>
								),
							}}
						/>
						<WrapButtons>
							<Button variant='outlined' onClick={handleClose}>
								Cancel
							</Button>
							<Button disabled={resAddPos.isLoading || resUpdatePos.isLoading} type='submit'>
								{buttonTitle}
							</Button>
						</WrapButtons>
					</form>
				</Container>
			</Dialog>
		</>
	)
}
