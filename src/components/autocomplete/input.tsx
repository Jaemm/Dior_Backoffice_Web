import { memo } from 'react'
import { Image } from './image'
import { useAutoComplete } from './useAutoComplete'
import { Wrapper, IconCheck, IconCancel, Container, WrapCancel } from './style'
import {
	Box,
	TextField,
	Typography,
	IconButton,
	Autocomplete,
	CircularProgress,
	InputAdornment,
} from '@mui/material'

interface IInput {
	value: any
	type: string
	name: string
	products: any[]
	onChange: any
	routine: string
}

export const AutoCompleteInput = memo(
	({ name, type, value, products, onChange, routine }: IInput) => {
		const { data, isLoading, isFetching, setSearchValue } = useAutoComplete(products, routine)

		return (
			<Wrapper>
				<div className='title'>{type}</div>
				<Autocomplete
					freeSolo
					id={name}
					value={value}
					disableClearable
					options={isLoading || isFetching ? [] : data.options}
					loading={isLoading || isFetching}
					onChange={(_, newValue) => {
						onChange(name, newValue)
					}}
					onInputChange={(_, newInputValue) => {
						setSearchValue(newInputValue)
					}}
					inputMode='search'
					getOptionLabel={(option: any) => option?.name || ''}
					renderOption={(option: any, value: any) => {
						return (
							<Box
								{...option}
								display='flex'
								sx={{ alignItems: 'center', padding: '5px 10px' }}
								component='li'
							>
								<Image src={value?.image_url} />
								<Box sx={{ padding: '5px 10px' }}>
									<Typography>{value?.code}</Typography>
									<Typography>{value?.name}</Typography>
								</Box>
							</Box>
						)
					}}
					renderInput={params => (
						<Container>
							<label htmlFor={name}>Product name</label>
							<TextField
								{...params}
								fullWidth
								variant='filled'
								placeholder='Enter product name'
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<InputAdornment position='end'>
											{isLoading || isFetching ? (
												<CircularProgress size='20px' sx={{ marginRight: '5px' }} />
											) : (
												data.options.find((v: any) => v?.id === value?.id) && (
													<IconButton size='small'>
														<IconCheck />
													</IconButton>
												)
											)}
										</InputAdornment>
									),
									disableUnderline: true,
								}}
							/>
						</Container>
					)}
				/>
				{data.options.find((v: any) => v?.id === value?.id) && (
					<WrapCancel>
						<IconButton
							style={{ marginTop: 25, width: 'fit-content' }}
							onClick={() => onChange(name, undefined)}
						>
							<IconCancel />
						</IconButton>
					</WrapCancel>
				)}
			</Wrapper>
		)
	},
)
