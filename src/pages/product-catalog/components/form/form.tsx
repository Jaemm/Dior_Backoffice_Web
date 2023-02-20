import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Counties } from '../countries'
import { Variation } from '../variation'
import { useCatForm } from './useCatForm'
import { Information } from '../information'
import { Translation } from '../translation'
import { FormProvider } from 'react-hook-form'
import { Dialog, IconButton } from '@mui/material'
import { usePermission } from 'hooks/usePermission'
import { Container, WrapError, WrapTabs } from './style'
import { a11yProps, TabPanel } from 'components/tab-panel'
import { DataRowProductCatalog } from 'types/product-catalog'
import { ReactComponent as IconExit } from 'assets/icons/exit.svg'

interface ICatalogForm {
	type: 'add' | 'edit'
	buttonTitle: string
	values?: DataRowProductCatalog
	ButtonModal: ({ onClick }: { onClick: () => void }) => JSX.Element
}

export const CatForm = ({ type, values, ButtonModal, buttonTitle }: ICatalogForm) => {
	const { isAdmin } = usePermission()
	const { open, form, value, toggle, isLoading, onSubmit, handleChange, handleNext, handleClose } =
		useCatForm(values, type)

	const errors = Object.values(form.formState.errors).map((v: any) => v.message)
	const isVariation = type === 'edit' && values?.routine === 'Makeup'

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
						maxWidth: 'fit-content',
						borderRadius: '20px',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<Container>
					<IconButton onClick={handleClose} className='exit' aria-label='exit'>
						<IconExit />
					</IconButton>
					<WrapError>
						{errors.length > 0 && value !== 0 && 'Please fill all required fields!'}
					</WrapError>
					<WrapTabs>
						<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
							{isAdmin && <Tab label='Information' {...a11yProps(0)} />}
							<Tab label='Countries' {...a11yProps(1)} />
							<Tab label='Translation' {...a11yProps(2)} />
							{isVariation && <Tab label='Variation' {...a11yProps(3)} />}
						</Tabs>
						<FormProvider {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								{isAdmin && (
									<TabPanel value={value} index={0}>
										<Information onNext={handleNext} onClose={handleClose} />
									</TabPanel>
								)}
								<TabPanel value={value} index={isAdmin ? 1 : 0}>
									<Counties type={type} onNext={handleNext} />
								</TabPanel>
								<TabPanel value={value} index={isAdmin ? 2 : 1}>
									<Translation
										type={type}
										onNext={handleNext}
										title={buttonTitle}
										isLoading={isLoading}
									/>
								</TabPanel>
							</form>
						</FormProvider>
						{isVariation && (
							<TabPanel value={value} index={3}>
								<Variation {...values} />
							</TabPanel>
						)}
					</WrapTabs>
				</Container>
			</Dialog>
		</>
	)
}
