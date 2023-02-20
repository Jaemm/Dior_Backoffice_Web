import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	table {
		width: calc(100% - 60px);
		background: #f4f2ff;
		border: 1px solid #5a5a5a;
		border-collapse: collapse;
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
	}
	th,
	td {
		text-align: left;
		border: 1px solid #5a5a5a;
		padding: 10px;
	}
`
