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
	onChange: any
	loading: boolean
	filter_by: string
	routine: 'Makeup' | 'Skincare'
}

export const AutoCompleteInput = memo(
	({ name, type, value, loading, onChange, routine, filter_by }: IInput) => {
		const { data, setData, isLoading, isFetching, searchValue, setSearchValue } = useAutoComplete(
			routine,
			filter_by,
		)

		return (
			<Wrapper>
				<div className='title'>{type}</div>
				<Autocomplete
					freeSolo
					id={name}
					value={value}
					disableClearable
					loading={isLoading || loading || isFetching}
					options={isLoading || loading || isFetching ? [] : data.data}
					onChange={(_, newValue) => {
						onChange(name, newValue)
					}}
					onInputChange={(_, newInputValue) => {
						setSearchValue(newInputValue)
						if (newInputValue.length === 0) {
							onChange(name, undefined)
							setData(prev => ({ ...prev, options: prev.data }))
						} else {
							const newOptions = data.data.filter(
								({ name, code }: any) =>
									name.toLowerCase().includes(newInputValue.toLowerCase()) ||
									code.toLowerCase().includes(newInputValue.toLowerCase()),
							)
							setData(prev => ({ ...prev, options: newOptions }))
						}
					}}
					filterOptions={(options, { inputValue }) => {
						return options.filter(
							(item: any) =>
								item.name.toUpperCase().includes(inputValue.toUpperCase()) ||
								item.code.toUpperCase().includes(inputValue.toUpperCase()),
						)
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
								placeholder='Enter product name/code'
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<InputAdornment position='end'>
											{isLoading || loading || isFetching ? (
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
				{searchValue.length > 0 && (
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
