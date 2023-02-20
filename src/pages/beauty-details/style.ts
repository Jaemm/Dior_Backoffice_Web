import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	padding: 10px;
	flex-direction: column;
`

export const Header = styled.div`
	width: 100%;
	display: grid;
	padding: 0 40px;
	column-gap: 30px;
	grid-template-columns: 1fr 1fr;
`

export const Wrap = styled.div`
	width: 100%;
	flex-grow: 1;
	display: flex;
	border-radius: 20px;
	background: #ffffff;
	flex-direction: column;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const Title = styled.div`
	font-size: 22px;
	font-weight: 700;
	color: var(--gray);
	padding: 10px 20px;
`

export const WrapLink = styled.div`
	font-size: 16px;
	font-weight: 400;
	color: var(--blur);
	text-decoration-line: underline;
`

export const Head = styled.div`
	display: flex;
	align-items: flex-end;
	padding: 10px 10px 15px;
	justify-content: flex-end;
`

export const WrapSpinner = styled.div`
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
`
