import styled from 'styled-components'
import { ReactComponent as Check } from 'assets/icons/check.svg'
import { ReactComponent as Cancel } from 'assets/icons/cancel.svg'

export const Container = styled.div`
	width: 90%;
	display: flex;
	flex-grow: 1;
	flex-direction: column;

	.MuiInputBase-input {
		border-bottom-left-radius: inherit !important;
		border-bottom-right-radius: inherit !important;
	}
	.MuiFilledInput-root {
		padding: 0 !important;
	}
`

export const Wrapper = styled.div`
	width: 100%;
	display: grid;
	position: relative;
	align-items: center;
	grid-template-columns: 0.3fr 0.7fr 50px;
	.title {
		font-weight: 500;
		font-size: 24px;
		color: var(--gray);
		white-space: nowrap;
	}
`

export const IconCheck = styled(Check)`
	width: 20px;
	height: 20px;
	margin-right: 5px;
`

export const IconCancel = styled(Cancel)`
	width: 20px;
	height: 20px;
`

export const WrapCancel = styled.div`
	top: 10px;
	right: 10px;
	position: absolute;
`
export const WrapRadio = styled.div`
	top: 21.5px;
	right: 38px;
	transform: scale(1.1); 
	position: absolute;
`
