import { Container } from './style'
import { TextField } from '@mui/material'

interface ISearch {
	value: string
	onChange: (e: any) => void
}

export const Search = ({ value, onChange }: ISearch) => {
	return (
		<Container>
			<label htmlFor='search'>Search</label>
			<TextField
				id='search'
				type='search'
				value={value}
				onChange={onChange}
				placeholder='Enter text here'
				inputProps={{
					underline: {
						'&&&:before': {
							borderBottom: 'none',
						},
						'&&:after': {
							borderBottom: 'none',
						},
					},
				}}
			/>
		</Container>
	)
}
