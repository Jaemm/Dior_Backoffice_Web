import styled from 'styled-components'

export const WrapList = styled.div`
	width: 100%;
	overflow-y: auto;
	padding: 7px 10px;
	border-radius: 6px;
	border: 1px solid var(--gray);
	display: grid;
	grid-template-columns: 1fr;
	margin: 20px 0;
	row-gap: 10px;
`

export const WrapDown = styled.div`
	display: flex;
	margin-right: 14px;
	align-items: center;
	svg {
		path {
			fill: var(--gray);
		}
	}
`

export const Placeholder = styled.div`
	font-size: 16px;
	font-weight: 400;
	color: var(--gray60);
`
