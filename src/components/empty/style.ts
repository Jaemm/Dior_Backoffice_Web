import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	padding: 10px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	.empty {
		svg {
			width: 60px !important;
			height: 60px !important;
			path {
				fill: var(--gray);
			}
		}
	}
	.text {
		margin-top: 10px;
		color: var(--gray);
	}
`
