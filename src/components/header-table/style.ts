import styled from 'styled-components'

export const Table = styled.table`
	width: 100%;
	height: fit-content;
	border-spacing: 0 8px;
	td:nth-child(odd) {
		text-align: right;
		background: var(--gray20);
		border-right: 1px solid black;
		border-radius: 20px 0px 0px 20px;
		width: 40%;
	}
	td:nth-child(even) {
		background: white;
		border-radius: 0 20px 20px 0;
	}
	td {
		font-size: 16px;
		font-weight: 400;
		color: var(--gray);
		white-space: nowrap;
		text-transform: uppercase;
		padding: 0 10px;
	}

	tr {
		height: 45px;
		border-radius: 20px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}
`
