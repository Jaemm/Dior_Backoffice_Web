import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	.group {
		height: 55px;
		width: 100%;
		display: flex;
		border-radius: 10px;
		justify-content: center;
		border: 2px solid #5a5a5a;
	}
	.MuiFormControlLabel-root:first-child {
		margin-right: 50px !important;
	}
	svg.icon {
		path {
			fill: #00c756 !important;
		}
	}
`
