import styled from 'styled-components'

export const Container = styled.div`
	width: 40vw;
	max-width: 600px;
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

export const WrapActive = styled.div`
	width: 100%;
	height: 55px;
	width: 100%;
	display: flex;
	border-radius: 10px;
	justify-content: center;
	border: 2px solid #5a5a5a;

	.MuiFormControlLabel-root:first-child {
		margin-right: 50px !important;
	}
`

export const WrapList = styled.div`
	width: 100%;
	overflow-y: auto;
	max-height: 300px;
	padding: 7px 10px;
	border-radius: 6px;
	border: 1px solid var(--gray);
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 20px;
`
