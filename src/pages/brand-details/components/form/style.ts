import styled from 'styled-components'

export const Container = styled.div`
	width: 33vw;
	max-width: 500px;
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
`

export const WrapButtons = styled.div`
	display: grid;
	margin-top: 10px;
	column-gap: 15px;
	grid-template-columns: 1fr 1fr;
`
