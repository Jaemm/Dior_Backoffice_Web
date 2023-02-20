import styled from '@emotion/styled'

export const Container = styled.div`
	width: 100%;
	.MuiInputBase-root {
		border-radius: 10px !important;
	}
`

export const Placeholder = styled.div`
	font-size: 16px;
	font-weight: 400;
	color: var(--gray60);
`

export const WrapDown = styled.div`
	display: flex;
	margin-right: 14px;
	align-items: center;
	svg {
		path {
			fill: var(--gray);
		}
	}
`

export const Label = styled.label`
	font-size: 16px;
	font-weight: 550;
	color: var(--gray);
`
