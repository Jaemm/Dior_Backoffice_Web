import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	display: grid;
	min-height: 50vh;
	margin: 40px 0 0;
	column-gap: 20px;
	grid-template-rows: 100%;
	grid-template-columns: 40% 60%;
`

export const LeftSide = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

export const RightSide = styled.div`
	width: 100%;
`
