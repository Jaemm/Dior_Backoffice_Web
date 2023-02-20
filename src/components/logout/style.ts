import styled from 'styled-components'

export const Container = styled.div`
	width: 30vw;
	padding: 45px;
	max-width: 500px;
	position: relative;
	.exit {
		top: 15px;
		left: 15px;
		position: absolute;
	}
	h3 {
		font-size: 24px;
		font-weight: 700;
		color: var(--black);
		user-select: none;
		text-align: center;
	}
	p {
		font-weight: 400;
		font-size: 18px;
		color: var(--black);
		text-align: center;
		margin: 20px 0 30px;
	}
`
