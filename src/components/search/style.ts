import styled from 'styled-components'

export const Container = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: column;
	label {
		font-size: 16px;
		font-weight: 500;
		color: var(--gray);
		white-space: nowrap;
	}
	.MuiInputBase-root {
		border-radius: 10px !important;
	}
`
