import styled from 'styled-components'

export const Container = styled.div`
	width: 250px;
	height: 135px;
	min-width: 250px;
	min-height: 135px;
	display: flex;
	background: #ffffff;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const Content = styled.div`
	height: 100%;
	flex-grow: 1;
	display: flex;
	padding-left: 30px;
	flex-direction: column;
	justify-content: center;
	h2 {
		font-size: 40px;
		font-weight: 400;
		line-height: 49px;
		color: var(--black20);
	}
	span {
		font-size: 14px;
		font-weight: 300;
		line-height: 17px;
		color: var(--gray70);
	}
`

export const Button = styled.button`
	width: 35px;
	height: 100%;
	border: none;
	display: flex;
	cursor: pointer;
	align-items: center;
	border-radius: 10px;
	justify-content: center;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	background: linear-gradient(180deg, #303030 0%, #747474 100%);
`
