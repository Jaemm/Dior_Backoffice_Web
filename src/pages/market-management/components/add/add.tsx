import { Input } from 'components/input'
import { Controller } from 'react-hook-form'
import { useAdd, optionsRecommendation } from './useAdd'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { ReactComponent as IconDown } from 'assets/icons/down.svg'
import { WrapDown, Container, WrapButtons, Placeholder, WrapRecommendation } from './style'
import { Button, Dialog, FormHelperText, IconButton, MenuItem, Select } from '@mui/material'

export const Add = () => {
	const { open, form, resAdd, toggle, onSubmit, handleClose } = useAdd()

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
					<h3>Add a new country</h3>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Input
							id='code'
							name='code'
							label='Market Code'
							control={form.control}
							placeholder='Enter Code here'
							error={!!form.formState.errors.code}
							message={form.formState.errors.code?.message}
						/>
						<Input
							id='name'
							name='name'
							label='Market Name'
							control={form.control}
							placeholder='Enter Name here'
							error={!!form.formState.errors.name}
							message={form.formState.errors.name?.message}
						/>
						<WrapRecommendation>
							<label htmlFor='default_recommendation'>Default Recommendation</label>
							<Controller
								name='default_recommendation'
								control={form.control}
								render={({ field }) => (
									<Select
										{...field}
										id='default_recommendation'
										displayEmpty
										labelId='default_recommendation'
										IconComponent={props => (
											<WrapDown {...props}>
												<IconDown />
											</WrapDown>
										)}
										renderValue={value => {
											return value === '' ? (
												<Placeholder>Select Default Recommendation</Placeholder>
											) : (
												optionsRecommendation.find(v => v.value === value)?.label
											)
										}}
									>
										{optionsRecommendation.map(({ value, label }) => (
											<MenuItem key={value} value={value}>
												{label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							<FormHelperText error={!!form.formState.errors.default_recommendation}>
								{form.formState.errors.default_recommendation?.message}
							</FormHelperText>
						</WrapRecommendation>
						<WrapButtons>
							<Button variant='outlined' onClick={handleClose}>
								Cancel
							</Button>
							<Button disabled={resAdd.isLoading} type='submit'>
								Save
							</Button>
						</WrapButtons>
					</form>
				</Container>
			</Dialog>
		</>
	)
}
