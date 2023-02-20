import styled from 'styled-components'
import { ReactComponent as ArrowPointing } from 'assets/icons/arrow-pointing.svg'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	padding: 10px;
	overflow-y: auto;
`

export const Wrap = styled.div`
	width: 100%;
	flex-grow: 1;
	display: flex;
	padding: 15px 20px;
	height: fit-content;
	border-radius: 20px;
	background: #ffffff;
	flex-direction: column;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const Header = styled.div`
	height: 170px;
	display: flex;
	padding: 0 40px;
	position: relative;
	align-items: center;
	border-radius: 20px;
	justify-content: space-between;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

	h2 {
		font-size: 55px;
		font-weight: 400;
		color: var(--black20);
	}
	span {
		font-size: 17px;
		font-weight: 300;
		color: var(--gray70);
	}
	button {
		border-radius: 8px;
	}
`
export const Contant = styled.div`
	margin-top: 15px;
	padding: 20px 40px;
	border-radius: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	thead {
		tr:first-child {
			th {
				padding-bottom: 8px;
				border-bottom: 1px solid;
			}
		}
		tr:last-child {
			th {
				padding-top: 10px;
			}
		}
	}
	tbody {
		.country {
			td {
				background: var(--gray90);
			}
		}
	}
	tr {
		td,
		th {
			font-size: 17px;
			text-align: left;
			font-weight: 400;
			color: var(--black20);
		}
		td:first-child,
		th:first-child {
			padding-left: 60px;
		}
	}
`

export const IconArrowPointing = styled(ArrowPointing)`
	transform: rotate(180deg);
`

export const BackButton = styled.button`
	top: 10px;
	right: -14px;
	width: 35px;
	height: calc(100% - 20px);
	border: none;
	display: flex;
	cursor: pointer;
	position: absolute;
	align-items: center;
	border-radius: 10px;
	justify-content: center;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	background: linear-gradient(180deg, #303030 0%, #747474 100%);
`
