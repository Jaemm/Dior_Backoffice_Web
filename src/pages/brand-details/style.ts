import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	padding: 10px;
`

export const Header = styled.div`
	display: flex;
	align-items: flex-end;
	padding: 10px 10px 15px;
	justify-content: space-between;
`

export const LeftSide = styled.div`
	display: grid;
	column-gap: 10px;
	align-items: end;
	grid-template-columns: auto auto;
`

export const RightSide = styled.div`
	display: grid;
	column-gap: 10px;
	margin-left: 10px;
	grid-template-columns: auto auto auto auto auto;
`

export const Wrap = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	border-radius: 20px;
	background: #ffffff;
	flex-direction: column;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const WrapEdit = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
`
