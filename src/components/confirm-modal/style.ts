import styled from '@emotion/styled'

export const Container = styled.div`
	width: 100%;
	header {
		display: flex;
		margin-bottom: 20px;
		justify-content: flex-end;
	}
	padding: 33px 33px 60px;
`

export const WrapButtons = styled.div`
	width: 100%;
	display: grid;
	margin-top: 60px;
	align-items: center;
	grid-column-gap: 20px;
	justify-content: center;
	grid-template-columns: minmax(auto, 180px) minmax(auto, 180px);
`
