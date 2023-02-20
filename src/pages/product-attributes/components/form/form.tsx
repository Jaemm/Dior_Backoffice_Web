import { Input } from 'components/input'
import { Select } from 'components/select'
import { Spinner } from 'components/spinner'
import { IValue, useAttributes } from './useAttributes'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { Button, Dialog, IconButton, TextField } from '@mui/material'
import {
	Li,
	WrapInputs,
	Container,
	WrapList,
	WrapSpinner,
	WrapButtons,
	ContainerLang,
} from './style'

interface IProductAttributes {
	title: string
	values?: IValue
	type: 'add' | 'edit'
	buttonTitle: string
	ButtonModal: ({ onClick }: { onClick: () => void }) => JSX.Element
}

export const FormProductAttributes = ({
	title,
	type,
	values,
	buttonTitle,
	ButtonModal,
}: IProductAttributes) => {
	const {
		open,
		form,
		resAdd,
		toggle,
		onSubmit,
		resUpdate,
		optionsType,
		handleClose,
		resCountries,
		allTranslation,
		setAllTranslation,
	} = useAttributes(values, type)

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
				<Container onSubmit={form.handleSubmit(onSubmit)}>
					<IconButton onClick={handleClose} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<h3>{title}</h3>
					<WrapInputs>
						<Select
							id='typ'
							name='typ'
							options={optionsType}
							control={form.control}
							error={!!form.formState.errors.typ}
							message={form.formState.errors.typ?.message}
							label='Attribute Type (Axis, Category, Collection)'
						/>
						<Input
							id='value'
							name='value'
							label='Attribute Name'
							control={form.control}
							placeholder='Enter name here'
							error={!!form.formState.errors.value}
							message={form.formState.errors.value?.message}
						/>
						<ContainerLang>
							<h3>Please input product name translations</h3>
							{resCountries.isLoading || resCountries.isFetching ? (
								<WrapSpinner>
									<Spinner center />
								</WrapSpinner>
							) : (
								<WrapList>
									{allTranslation.map((v: any) => (
										<Li key={v.language}>
											<div>{v.language}:</div>
											<div>
												<label htmlFor={v.language}>Product name</label>
												<TextField
													fullWidth
													variant='filled'
													value={v.value}
													id={v.language}
													name={v.language}
													onChange={(e: any) => {
														const newData: any = allTranslation.map((a: any) => {
															if (e.target.id === a.language) {
																return { ...a, value: e.target.value }
															}
															return a
														})
														setAllTranslation(newData)
														form.setValue(
															'product_translations',
															newData.filter(
																(v: any) =>
																	v.value !== '' && v.value !== undefined && v.value !== null,
															),
														)
													}}
													placeholder='Enter product name'
													InputProps={{ disableUnderline: true }}
												/>
											</div>
										</Li>
									))}
								</WrapList>
							)}
						</ContainerLang>
					</WrapInputs>
					<WrapButtons>
						<Button variant='outlined' onClick={handleClose}>
							Cancel
						</Button>
						<Button disabled={resAdd.isLoading || resUpdate.isLoading} type='submit'>
							{buttonTitle}
						</Button>
					</WrapButtons>
				</Container>
			</Dialog>
		</>
	)
}
