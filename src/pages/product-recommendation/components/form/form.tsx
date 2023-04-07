import { Make } from '../make'
import { Skin } from '../skin'
import { Input } from 'components/input'
import { WrapName, Container } from './style'
import { FormProvider } from 'react-hook-form'
import { useProForm, IValue } from './useProForm'
import { a11yProps, TabPanel } from 'components/tab-panel'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'
import { Button, Dialog, IconButton, Tab, Tabs } from '@mui/material'

interface IForm {
	total: number
	type: 'add' | 'edit'
	buttonTitle: string
	values?: IValue
	ButtonModal: ({ onClick }: { onClick: () => void }) => JSX.Element
}

export const Form = ({ type, total, values, ButtonModal, buttonTitle }: IForm) => {
	const {
		make,
		skin,
		open,
		form,
		value,
		toggle,
		setMake,
		setSkin,
		onSubmit,
		isLoading,
		handleClose,
		handleChange,
		handleChangeSkin,
		handleChangeMake,
	} = useProForm(values, type, total)

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
				maxWidth='md'
			>
				<Container>
					<IconButton onClick={handleClose} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<WrapName>
								<Input
									id='name'
									name='name'
									label='Recommendation name'
									control={form.control}
									placeholder='Enter name here'
									error={!!form.formState.errors.name}
									message={form.formState.errors.name?.message}
								/>
							</WrapName>
							<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
								<Tab
									disabled={type === 'edit' && values?.routine === 'Makeup'}
									label='Skincare'
									{...a11yProps(0)}
								/>
								<Tab
									disabled={type === 'edit' && values?.routine === 'Skincare'}
									label='Make Up'
									{...a11yProps(1)}
								/>
							</Tabs>
							<TabPanel value={value} index={0}>
								<Skin values={skin} setValues={setSkin} onChange={handleChangeSkin} />
								<Button disabled={isLoading} type='submit' fullWidth>
									{buttonTitle}
								</Button>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Make values={make} setValues={setMake} onChange={handleChangeMake} />
								<Button disabled={isLoading} type='submit' fullWidth>
									{buttonTitle}
								</Button>
							</TabPanel>
						</form>
					</FormProvider>
				</Container>
			</Dialog>
		</>
	)
}
