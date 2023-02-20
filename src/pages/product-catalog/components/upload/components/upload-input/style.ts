import styled from 'styled-components'

export const Container = styled.div`
	label {
		font-size: 16px;
		font-weight: 550;
		color: var(--gray);
	}
	div.error {
		left: 0;
		top: 100%;
		font-weight: 400;
		font-size: 14px;
		color: #d32f2f;
		position: absolute;
	}
`

export const Wrap = styled.div`
	width: 100%;
	display: flex;
	user-select: none;
	height: fit-content;
	border-radius: 15px;
	align-items: center;
	position: relative;
	border: 1px solid var(--gray);
	justify-content: space-between;
	overflow: hidden;
	.title {
		height: 50px;
		width: 100%;
		flex-grow: 1;
		font-size: 18px;
		font-weight: 400;
		margin-left: 20px;
		color: var(--gray60);
		overflow: auto;
		white-space: nowrap;
		display: flex;
		align-items: center;
		::-webkit-scrollbar {
			display: none;
		}
		margin-right: 10px;
	}
`

export const FormButtons = styled.div`
	display: grid;
	column-gap: 15px;
	margin-top: 40px;
	justify-content: center;
	grid-template-columns: repeat(2, 180px);
`
