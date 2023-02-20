import styled from 'styled-components'

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	background-color: var(--gray);
`

export const Wrapper = styled.div`
	flex-grow: 1;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	& > div {
		width: 100%;
		height: 60%;
		display: flex;
		padding: 24px 50px;
		border-radius: 8px;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background-color: white;
	}
`

export const Title = styled.div`
	font-size: 120px;
	color: var(--gray);
`

export const SubTitle = styled.div`
	font-size: 24px;
`

export const Text = styled.div`
	font-size: 20px;
	margin-bottom: 20px;
`

export const Footer = styled.footer`
	svg {
		path {
			fill: white;
		}
	}
	color: white;
	display: flex;
	font-size: 14px;
	text-align: center;
	margin: 20px 0 40px;
	flex-direction: column;
`
