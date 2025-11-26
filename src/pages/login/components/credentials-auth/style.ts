import styled from 'styled-components'

export const Form = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 15px;
	.MuiFormControl-root:first-child {
		margin-bottom: 7px;
	}
	.MuiInputBase-root {
		padding-right: 0 !important;
	}
`

export const Remember = styled.div`
	padding: 7px 0;
	.MuiFormControlLabel-root {
		margin: 0 !important;
	}
	.MuiTypography-root {
		font-size: 18px;
		font-weight: 400;
		color: var(--gray);
	}
`

export const WrapIcons = styled.div`
	display: grid;
	grid-gap: 10px;
	align-items: center;
	grid-template-columns: auto auto;
	svg {
		cursor: pointer;
	}
`
