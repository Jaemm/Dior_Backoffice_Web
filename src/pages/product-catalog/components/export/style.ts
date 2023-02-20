import styled from 'styled-components'

export const Container = styled.div`
	width: 70vw;
	min-width: 550px;
	max-width: 80vw;
	position: relative;
	padding: 25px 45px 45px;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	.exit {
		top: 15px;
		left: 15px;
		position: absolute;
	}
	button {
		width: fit-content;
	}
`

export const Wrapper = styled.div`
	display: grid;
	row-gap: 5px;
	min-height: 200px;
	justify-items: center;
	align-content: center;
	grid-template-columns: 1fr;
	h2 {
		font-size: 20px;
		font-weight: 400;
		text-align: center;
		color: var(--gray80);
	}
`
