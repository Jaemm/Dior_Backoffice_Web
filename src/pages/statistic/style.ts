import styled from 'styled-components'

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
