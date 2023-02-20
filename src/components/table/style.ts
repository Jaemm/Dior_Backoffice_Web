import styled from 'styled-components'

type PropTypes = {
	maxHeight: number
	loading?: string
}

export const Container = styled.div<PropTypes>`
	width: 100%;
	flex-grow: 1;
	display: flex;
	position: relative;
	flex-direction: column;
	height: ${({ loading, maxHeight }) => (loading === 'true' ? 0 : `${maxHeight}px`)};

	.linear {
		left: 0;
		top: -4px;
		width: 100%;
		z-index: 200;
		position: absolute;
	}
	padding-bottom: 5px;
`

export const WrapSpinner = styled.div`
	width: 100%;
	display: flex;
	min-height: 160px;
	align-items: center;
	justify-content: center;
`
