import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	.MuiInputBase-root {
		border-radius: 10px !important;
	}
	label {
		font-size: 16px;
		font-weight: 550;
		color: var(--gray);
	}
	.placeholder {
		font-size: 16px;
		font-weight: 400;
		color: var(--gray60);
	}
`

export const WrapDown = styled.div`
	.down {
		display: flex;
		margin-right: 14px;
		align-items: center;
		svg {
			path {
				fill: var(--gray);
			}
		}
	}
`
