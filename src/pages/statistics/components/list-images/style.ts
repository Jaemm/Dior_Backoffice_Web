import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const Wrap = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.prev,
	.next {
		height: fit-content;
	}
	.next {
		svg {
			transform: rotate(180deg);
		}
	}
`
export const WrapSwiper = styled.div`
	width: 85%;
	padding: 0 20px;
`
