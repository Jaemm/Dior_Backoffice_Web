import { Button } from '@mui/material'
import { useUpload } from './useUpload'
import { Wrap, Container, WrapCountry, FormButtons } from './style'
import { diorImport, diorTypes } from 'types'
import { CountrySelect } from 'components/country-select'
import { useCountries } from 'hooks/useCountries'

export interface IUpload {
	label?: string
	type: diorTypes
	onClose: () => void
	importDior?: diorImport
	withCountry?: boolean
	keyQuery?: string
	accept?: string
}

export const UploadInput = ({
	type,
	importDior = 'import',
	onClose,
	label,
	withCountry,
	keyQuery,
}: IUpload) => {
	const { options, isLoading: countryIsLoading } = useCountries()
	const {
		ref,
		form,
		fileName,
		onSubmit,
		resFilePut,
		resUpload,
		resSaveFile,
		handleClick,
		handleChange,
		handleCancel,
	} = useUpload({
		type,
		onClose,
		importDior,
		withCountry,
		keyQuery,
	})

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			{withCountry && (
				<WrapCountry>
					<CountrySelect
						name='country'
						options={options}
						control={form.control}
						disabled={countryIsLoading}
						error={!!form.formState.errors.country}
						message={form.formState.errors.country?.message}
					/>
				</WrapCountry>
			)}
			<Container>
				<label htmlFor='upload-file'>{label}</label>
				<Wrap>
					<span>{fileName}</span>
					<input
						ref={ref}
						type='file'
						id='upload-file'
						name='upload-file'
						onChange={handleChange}
						style={{ display: 'none' }}
						accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
					/>
					<Button disabled={resUpload.isLoading || resFilePut.isLoading} onClick={handleClick}>
						Browse
					</Button>
					<div className='error'>
						{form.formState.errors.file_url ? form.formState.errors.file_url?.message : ''}
					</div>
				</Wrap>
			</Container>
			<FormButtons>
				<Button onClick={handleCancel} variant='outlined'>
					Cancel
				</Button>
				<Button
					disabled={resSaveFile.isLoading || resUpload.isLoading || resFilePut.isLoading}
					type='submit'
				>
					Upload
				</Button>
			</FormButtons>
		</form>
	)
}
