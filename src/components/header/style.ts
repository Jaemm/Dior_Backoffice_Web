import styled from 'styled-components'

export const WrapHeader = styled.header`
	width: 100%;
	display: flex;
	min-height: 80px;
	max-height: 80px;
	padding: 5px 20px;
	align-items: flex-end;
	background-color: white;
	justify-content: space-between;
	filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.1));
`

export const RightSide = styled.div`
	height: 100%;
	display: flex;
	margin-left: 15px;
	align-items: center;
`

export const WrapUser = styled.div`
	width: 130px;
	height: 55px;
	display: flex;
	padding: 0 10px;
	border-radius: 10px;
	background: #ffffff;
	align-items: center;
	border: 1px solid var(--gray);
	justify-content: space-between;
	span {
		font-size: 18px;
		font-weight: 400;
		color: var(--gray);
	}
	.icon {
		display: flex;
		align-items: center;
	}
`
