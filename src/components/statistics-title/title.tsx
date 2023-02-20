import { Container } from './style'

interface ITitle {
	text: string
	title: string
}

export const Title = ({ text, title }: ITitle) => {
	return (
		<Container>
			<h5>{title}</h5>
			<div className='text'>{text}</div>
			<div className='break' />
		</Container>
	)
}
