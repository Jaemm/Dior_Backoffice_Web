import styled from 'styled-components'

export const Container = styled.div`
	display: grid;
	row-gap: 15px;
	grid-template-columns: 1fr;

	.first {
		display: grid;
		column-gap: 15px;
		grid-template-columns: 0.4fr 0.6fr;
	}
	.second {
		display: grid;
		column-gap: 15px;

		grid-template-columns: 0.5fr 0.5fr;
	}
	.end {
		align-items: end;
	}
`

export const WrapButtons = styled.div`
	display: grid;
	row-gap: 15px;
	grid-template-columns: 1fr;
`

export const LabelUpload = styled.label`
	width: 100%;
	height: 100%;
	display: flex;
	height: 180px;
	max-width: 220px;
	min-height: 180px;
	max-height: 180px;
	position: relative;
	flex-direction: column;
	.label {
		font-size: 16px;
		font-weight: 500;
		color: var(--gray);
		white-space: nowrap;
	}
	span {
		width: 100%;
		height: 150px;
		min-height: 150px;
		max-height: 150px;
	}
	img {
		width: 100%;
		object-fit: fill;
		height: 150px;
		min-height: 150px;
		max-height: 150px;
	}
	.loading {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
	svg {
		width: 100%;
		height: 100%;
	}
	input {
		display: none;
	}
	cursor: pointer;
	position: relative;
	.wrapSpinner {
		width: 100%;
		height: 100%;
		position: absolute;
		top: center;
		left: center;
	}
`
