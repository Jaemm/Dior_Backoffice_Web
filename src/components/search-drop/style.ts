import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	.MuiInputBase-root {
		min-width: 150px;
	}
	.MuiInputBase-root .MuiOutlinedInput-notchedOutline {
		border-color: var(--gray) !important;
		border-radius: 10px !important;
	}

	label {
		font-size: 16px;
		font-weight: 500;
		color: var(--gray);
		white-space: nowrap;
	}
`

export const Textbox = styled.input`
	border: 1px black semisolid;
	padding: 14px 0 15px 5px;
	font-size: 18px;
	border-radius: 10px;
`

export const Placeholder = styled.div`
	font-size: 16px;
	font-weight: 400;
	color: var(--gray60);
`

export const WrapDown = styled.div`
	svg {
		margin-right: 10px;
	}
`
