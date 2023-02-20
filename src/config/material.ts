import { checkboxClasses } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	palette: {
		primary: {
			main: '#5a5a5a',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					height: 55,
					fontWeight: 400,
					fontSize: '18px',
					borderRadius: 15,
					boxShadow: 'none',
					textTransform: 'capitalize',
					'&.Mui-disabled': {
						color: 'white',
						background: 'var(--gray30)',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
					},
				},
			},
			variants: [
				{
					props: { variant: 'contained' },
					style: {
						background: 'var(--gray)',
						color: 'white',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						'&:hover': {
							opacity: 0.9,
							background: 'var(--gray)',
							color: 'white',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						},
						'&.Mui-disabled': {
							color: 'white',
							backgroundColor: 'var(--gray30)',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						},
					},
				},
				{
					props: { variant: 'text' },
					style: {
						color: 'white',
						padding: '0 25px',
						border: 'none',
						background: 'radial-gradient(67.52% 352.01% at 50% 50%, #747474 0%, #1F1F1F 100%)',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						'&:hover': {
							color: '#FFFFFF',
							border: 'none',
						},
					},
				},
				{
					props: { variant: 'outlined' },
					style: {
						fontWeight: 400,
						fontSize: '18px',
						color: '#000000',
						padding: '0 25px',
						borderRadius: '15px',
						background: '#FFFFFF',
						border: '1px solid #000000',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
					},
				},
			],
		},
		MuiCircularProgress: {
			styleOverrides: {
				root: {
					color: 'var(--gray)',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					borderRadius: '15px !important',
					backgroundColor: 'white !important',
				},
				input: {
					padding: '16px 10px!important',
					'::placeholder': {
						opacity: 1,
						fontSize: 16,
						fontWeight: 400,
						color: 'var(--gray10)',
					},
				},
			},
		},
		MuiTextField: {
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						root: {
							backgroundColor: 'white !important',
						},
						'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
							border: '1px solid var(--black)',
						},
						'& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
							border: '1px solid var(--black)',
							boxShadow: '0px 0px 0px 1px var(--black)',
						},
						'& .MuiOutlinedInput-root.Mui-error  .MuiOutlinedInput-notchedOutline': {
							border: '1px solid var(--red)',
							boxShadow: '0px 0px 0px 1px var(--red)',
						},
					},
				},
				{
					props: { variant: 'filled' },
					style: {
						'& .MuiInputBase-root': {
							border: '1px solid var(--gray)',
							borderRadius: '10px !important',
						},
					},
				},
			],
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					background: 'white',
					'& fieldset': {
						borderColor: 'var(--black)',
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: 'var(--gray)',
					[`&.${checkboxClasses.checked}`]: {
						color: 'var(--gray)',
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderWidth: '2px',
					borderRadius: 10,
					borderColor: 'var(--gray30)',
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					marginLeft: 5,
					fontWeight: 400,
					fontSize: '14px',
					color: '#FFFFFF',
					textAlign: 'center',
					background: '#C4C4C4',
					borderRadius: '15px 15px 0px 0px',
					boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
					'&.Mui-selected': {
						fontWeight: 400,
						fontSize: '14px',
						color: '#FFFFFF',
						textAlign: 'center',
						background: '#494949',
						boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					borderBottom: '1px solid #494949',
				},
			},
		},
	},
})
