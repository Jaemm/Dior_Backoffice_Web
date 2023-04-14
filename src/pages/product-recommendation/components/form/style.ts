import styled from 'styled-components'

export const Container = styled.div`
	width: 45vw;
	max-width: 700px;
	position: relative;
	padding: 25px 45px 45px;
	.exit {
		top: 15px;
		left: 15px;
		position: absolute;
	}
	h3 {
		font-size: 24px;
		font-weight: 700;
		text-align: center;
		color: var(--gray80);
	}
	form {
		display: grid;
		row-gap: 15px;
		grid-template-columns: 100%;
		svg {
			path {
				fill: var(--gray50);
			}
		}
	}
	.MuiBox-root {
		padding: 24px 0 0;
	}
	.MuiInputBase-root {
		border-radius: 10px !important;
	}
`

export const WrapName = styled.div`
	margin: 15px 0;
`
