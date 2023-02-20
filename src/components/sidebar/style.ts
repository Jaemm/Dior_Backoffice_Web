import styled from 'styled-components'

export const Aside = styled.aside`
	height: 100%;
	display: flex;
	max-width: 30%;
	overflow-y: auto;
	min-width: 300px;
	overflow-x: hidden;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	background: var(--sidebar-linear);
	footer {
		width: 100%;
		display: flex;
		color: #5a5a5a;
		font-size: 14px;
		margin-bottom: 20px;
		align-items: center;
		flex-direction: column;
	}
`

export const Wrapper = styled.div`
	width: 100%;
	display: grid;
	row-gap: 35px;
	padding: 20px 0 20px 20px;
	grid-template-columns: 100%;
	& > a {
		width: fit-content;
	}
`

export const Ul = styled.ul`
	margin-top: 10px;
	position: relative;
	.title {
		left: 0;
		top: -35px;
		font-size: 16px;
		font-weight: 700;
		color: var(--gray);
		position: absolute;
		width: calc(100% - 7px);
		border-bottom: 3px solid var(--gray10);
	}
	li {
		width: 100%;
		display: flex;
		white-space: nowrap;
		align-items: center;
		border-radius: 30px 0px 0px 30px;

		.wrap-link,
		.logout-button {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			border-radius: 30px 0px 0px 30px;
			.icon {
				display: flex;
				margin: 0 20px;
				align-items: center;
			}
			span {
				display: flex;
				font-size: 17px;
				font-weight: 400;
				color: var(--gray);
				align-items: center;
			}
		}
		.wrap-link:hover:not(.active),
		.logout-button:hover {
			background-color: var(--gray10);
		}
		button {
			border: none;
			display: flex;
			cursor: pointer;
			align-items: center;
			background-color: transparent;
		}
		.active {
			background-color: var(--gray);
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			span {
				color: #ffffff;
			}
		}
		a {
			width: 100%;
			display: flex;
			align-items: center;
			border-radius: 30px 0px 0px 30px;
		}
	}
`
