import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	overflow-y: auto;
	position: relative;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url('images/bg.webp');
`

export const Wrapper = styled.main`
	width: 33%;
	flex-grow: 1;
	display: flex;
	max-width: 500px;
	min-width: 280px;
	align-items: center;
	padding-bottom: 70px;
	flex-direction: column;
	justify-content: center;
`

export const Content = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	border-radius: 18px;
	flex-direction: column;
	padding: 30px 60px 50px;
	backdrop-filter: blur(10px);
	background: rgba(255, 255, 255, 0.3);
	box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
`

export const Footer = styled.footer`
	bottom: 20px;
	display: flex;
	color: #5a5a5a;
	font-size: 14px;
	position: absolute;
	text-align: center;
	flex-direction: column;
`
