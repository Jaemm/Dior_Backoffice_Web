import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-grow: 1;
	overflow: hidden;
`

export const PageContainer = styled.div`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	display: flex;
	overflow-y: auto;
	overflow-x: hidden;
	flex-direction: column;
	background-color: var(--gray20);
`

export const Content = styled.main`
	width: 100%;
	flex-grow: 1;
	display: flex;
	height: calc(100% - 80px);
`
