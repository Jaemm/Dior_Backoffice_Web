import styled from 'styled-components'

export const Container = styled.div`
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

export const WrapList = styled.div`
	width: 100%;
	margin: 10px 0;
	overflow-y: auto;
	max-height: 450px;
	padding: 7px 10px;
	border-radius: 6px;
	border: 1px solid var(--gray);
`

export const WrapButton = styled.div`
	display: grid;
	column-gap: 15px;
	grid-template-columns: auto auto;
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
