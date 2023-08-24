import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	height: 50vh;
	flex-grow: 1;

	& > div {
		height: 50vh;
	}
	.rdt_TableBody .rdt_TableRow {
		height: 100px !important;
	}
	.rdt_TableHead .rdt_TableHeadRow .rdt_TableCol:not(:last-child, :first-child) {
		border-right: 0;
	}
	.rdt_TableHead .rdt_TableHeadRow {
		border-radius: 0;
		background-color: var(--gray110);
	}
	.rdt_TableHead .rdt_TableHeadRow {
		box-shadow: none;
	}
`

export const WrapButtons = styled.div`
	height: 100px;
	display: flex;
	flex-direction: column;
	& > button {
		width: 55px;
		height: 50px;
		border: none;
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		&:disabled {
			cursor: not-allowed;
			background-color: #cccccc;
		}
	}
	.edit {
		border-radius: 0 15px 0 0;
		background: linear-gradient(180deg, #303030 0%, #747474 100%);
	}
	.delete {
		border-radius: 0 0 15px 0;
		background: #cc5858;
	}
`
export const WrapEdit = styled.div`
	.edit {
		border-radius: 0 15px 15px 0;
		background: linear-gradient(180deg, #303030 0%, #747474 100%);
	}
	& > button {
		width: 55px;
		border: none;
		display: flex;
		height: 100px;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		&:disabled {
			cursor: not-allowed;
			background-color: #cccccc;
		}
	}
`

export const WrapNewButton = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 10px;
	justify-content: flex-end;
`

export const Form = styled.form`
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

export const WrapButtonsSubmit = styled.div`
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
