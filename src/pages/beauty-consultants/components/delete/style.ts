import styled from 'styled-components'

export const Container = styled.div`
	width: 50vw;
	max-width: 600px;
	position: relative;
	padding: 25px 45px 45px;
	.exit {
		top: 15px;
		left: 15px;
		position: absolute;
	}
	h3 {
		font-size: 22px;
		font-weight: 700;
		text-align: center;
		color: var(--gray80);
	}
`

export const WrapButtons = styled.div`
	display: grid;
	margin-top: 10px;
	column-gap: 15px;
	justify-content: center;
	grid-template-columns: repeat(2, 190px);
`

export const WrapList = styled.div`
	margin: 20px 0;
	overflow-y: auto;
	max-height: 300px;
	padding: 7px 10px;
	border-radius: 6px;
	border: 1px solid var(--gray);
`
