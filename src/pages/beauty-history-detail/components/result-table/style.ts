import styled from 'styled-components'

interface IContainer {
	length: number
	loading: boolean
}

export const Container = styled.div<IContainer>`
	width: 100%;
	padding: 15px 20px;
	background: #ffffff;
	border-radius: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	min-height: ${({ length, loading }) =>
		loading ? '160px' : length === 0 ? '220px' : 'fit-content'};
	margin-bottom: 20px;
`

export const Table = styled.table`
	width: 100%;
	border-spacing: 0 10px;
	position: relative;

	thead {
		border-radius: 15px;
		tr {
			height: 55px;
			background: #d9d9d9;
			border-radius: 15px;
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
			th {
				font-size: 16px;
				font-weight: 700;
				color: var(--gray);
			}
			th:first-child {
				border-radius: 15px 0 0 15px;
			}
			th:last-child {
				border-radius: 0 15px 15px 0;
			}
		}
	}
	tbody {
		tr {
			height: 50px;
			background: #ffffff;
			border-radius: 15px;
			box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
			td {
				font-size: 16px;
				font-weight: 400;
				text-align: center;
				color: var(--gray);
			}
			td:first-child {
				background: #d9d9d9;
				border-radius: 15px;
				box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
			}
			td:last-child {
				border-radius: 0 15px 15px 0;
			}
		}
	}
`

export const WrapSpinner = styled.div`
	top: 100%;
	width: 100%;
	left: center;
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
`
