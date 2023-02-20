import styled from '@emotion/styled'

export const Container = styled.div`
	max-width: 90px;
	width: 100%;
	height: 90px;
	min-height: 90px;
	max-height: 90px;
	overflow: hidden;
	position: relative;
	border-radius: 10px;
	border: 1px solid var(--gray);
	span,
	img {
		width: 100%;
		height: 90px;
		min-height: 90px;
		max-height: 90px;
		object-fit: fill;
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
