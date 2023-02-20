import { PropTypes } from './spinner'
import styled, { css } from 'styled-components'

const centerSpinner = css`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const Container = styled.div<PropTypes>`
	${({ center }) => center && centerSpinner}
	.MuiCircularProgress-root {
		color: var(--gray);
	}
`
