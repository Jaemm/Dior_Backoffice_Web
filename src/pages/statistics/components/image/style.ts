import styled from '@emotion/styled'

export const Container = styled.div`
	width: 100%;
	height: 140px;
	min-height: 140px;
	max-height: 140px;
	position: relative;
	span {
		width: 100%;
		height: 140px;
		min-height: 140px;
		max-height: 140px;
	}
	img {
		width: 100%;
		height: 140px;
		object-fit: fill;
		min-height: 140px;
		max-height: 140px;
		border-radius: 10px;
	}
	.loading {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
`
