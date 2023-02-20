import styled from 'styled-components'

export const Container = styled.div`
	.rmdp-container input {
		display: none !important;
	}
	.rmdp-container {
		left: 0;
		top: 100%;
		width: 100%;
		position: absolute;
	}
	display: grid;
	position: relative;
	grid-column-gap: 10px;
	grid-template-columns: min-content min-content;
`
export const WrapButton = styled.section`
	h6 {
		font-size: 16px;
		font-weight: 500;
		color: var(--gray);
		white-space: nowrap;
	}
	.date-button {
		display: flex;
		height: 55px;
		cursor: pointer;
		max-width: 180px;
		min-width: 150px;
		padding: 15px 10px 15px 20px;
		align-items: center;
		background: #ffffff;
		border-radius: 10px;
		border: 1px solid var(--gray);
		justify-content: space-between;
		div {
			flex: 1;
			height: 100%;
			display: flex;
			font-size: 16px;
			font-weight: 400;
			margin-right: 15px;
			color: var(--gray10);
			align-items: flex-end;
		}
	}
`
