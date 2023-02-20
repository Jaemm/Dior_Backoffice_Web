import styled from 'styled-components'

export const Container = styled.div`
	padding: 30px 20px;
	background: #ffffff;
	border-radius: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

export const Table = styled.table`
	width: 100%;
	td:nth-child(odd) {
		text-align: right;
	}
	td {
		padding: 5px;
		white-space: nowrap;
		span {
			padding-right: 5px;
		}
	}
`
