import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	display: flex;
	min-height: 170px;
	background: #ffffff;
	align-items: center;
	border-radius: 12.678px;
	justify-content: center;
	box-shadow: 0px 0px 12.678px rgba(0, 0, 0, 0.2);
`

export const Content = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	h2 {
		color: #161616;
		font-size: 50px;
		font-weight: 400;
		line-height: 73px;
		margin-bottom: 8px;
	}
	span {
		color: #8d8d8d;
		font-size: 20px;
		font-weight: 200;
		line-height: 29px;
		text-align: center;
	}
`
