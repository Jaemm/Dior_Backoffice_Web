import styled from 'styled-components'

export const Container = styled.div`
	min-width: max-content;
	max-width: 100vw;
	position: relative;
	padding: 25px 45px 45px;
	width: 100%;
	display: flex;
	flex-direction: column;
	.exit {
		top: 15px;
		left: 15px;
		position: absolute;
	}
	.MuiBox-root {
		padding: 24px 0 0;
	}
`

export const WrapError = styled.div`
	width: 100%;
	color: #d32f2f;
	padding: 5px 0;
	text-align: center;
`

export const WrapTabs = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`
