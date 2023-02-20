import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	padding: 10px;
	overflow-y: auto;
	flex-direction: column;
`

export const Header = styled.div`
	width: 100%;
	display: grid;
	padding: 0 20px;
	column-gap: 20px;
	grid-template-columns: 1fr 1fr 1fr;
`

export const Title = styled.div`
	font-size: 22px;
	font-weight: 700;
	color: var(--gray);
	padding: 10px 20px;
`

export const WrapSpinner = styled.div`
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
`
