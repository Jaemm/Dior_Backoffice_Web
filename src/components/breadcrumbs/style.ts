import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-grow: 1;
	align-items: flex-end;
	justify-content: space-between;
	.wrap-previous {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
	}
`

export const Wrap = styled.div`
	width: 100%;
`

export const Ul = styled.ul`
	width: 100%;
	display: flex;
	text-overflow: ellipsis;
	flex-wrap: wrap;
	li {
		font-size: 20px;
		font-weight: 700;
		user-select: none;
		color: var(--gray);
		white-space: nowrap;

		span.main {
			font-size: 20px;
			font-weight: 700;
			color: var(--gray);
		}
	}
	li > a {
		margin-right: 10px;
		color: var(--gray10);
	}
`
