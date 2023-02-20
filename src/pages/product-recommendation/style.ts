import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	padding: 10px;
`

export const Wrap = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	border-radius: 20px;
	background: #ffffff;
	flex-direction: column;
	align-items: flex-end;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	.rdt_TableBody .rdt_TableRow {
		height: 100px !important;
	}
`

export const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	padding: 10px 10px 15px;
	justify-content: space-between;
`

export const LeftSide = styled.div`
	display: grid;
	column-gap: 5px;
	align-items: end;
	grid-template-columns: auto auto;
`

export const RightSide = styled.div`
	display: grid;
	column-gap: 5px;
	margin-left: 10px;
	grid-template-columns: repeat(3, auto);
`

export const WrapRound = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	transform: rotate(180deg);
`

export const WrapButtons = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: flex-end;
	flex-direction: column;
	& > button {
		width: 55px;
		height: 50px;
		border: none;
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		&:disabled {
			cursor: not-allowed;
			background-color: #cccccc;
		}
	}
	.edit {
		border-radius: 0 10px 0 0;
		background: linear-gradient(180deg, #303030 0%, #747474 100%);
	}
	.delete {
		background: #cc5858;
		border-radius: 0 0 10px 0;
	}
`
