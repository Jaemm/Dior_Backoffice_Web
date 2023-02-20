import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.wrapbutton {
		display: grid;
		column-gap: 15px;
		grid-template-columns: auto auto;
	}
	p {
		width: 100%;
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

export const WrapSpinner = styled.div`
	width: 100%;
	display: flex;
	min-height: 300px;
	align-items: center;
	justify-content: center;
`
