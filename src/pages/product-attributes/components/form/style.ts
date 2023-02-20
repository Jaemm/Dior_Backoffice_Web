import styled from 'styled-components'

export const Container = styled.form`
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

export const WrapInputs = styled.div`
	display: grid;
	row-gap: 15px;
	grid-template-columns: 1fr;
`

export const WrapList = styled.div`
	width: 100%;
	margin: 10px 0;
	overflow-y: auto;
	max-height: 450px;
	padding: 7px 10px;
	border-radius: 6px;
	border: 1px solid var(--gray);
`

export const Li = styled.div`
	display: grid;
	margin: 10px 0;
	column-gap: 15px;
	align-items: center;
	grid-template-columns: 0.3fr 0.7fr;
	div:first-child {
		justify-self: end;
		align-items: center;
		text-align: end;
	}
`

export const WrapSpinner = styled.div`
	width: 100%;
	display: flex;
	min-height: 300px;
	align-items: center;
	justify-content: center;
`

export const ContainerLang = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	h3 {
		width: 100%;
		font-size: 18px;
		font-weight: 500;
		text-align: start;
		color: var(--gray);
	}
`

export const WrapButtons = styled.div`
	display: grid;
	margin-top: 10px;
	column-gap: 15px;
	grid-template-columns: 1fr 1fr;
`
