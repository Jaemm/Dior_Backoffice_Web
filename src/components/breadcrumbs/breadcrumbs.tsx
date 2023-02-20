import { Button } from '@mui/material'
import { useBread } from 'hooks/useBread'
import { Ul, Wrap, Container } from './style'
import { NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as IconArrowDown } from 'assets/icons/arrow-down.svg'

export const Breadcrumbs = () => {
	const navigate = useNavigate()
	const { breadcrumbs } = useBread()

	return (
		<Container>
			<Wrap>
				<Ul>
					{breadcrumbs.map(({ text, href, main }, index) => (
						<li key={href}>
							{main && breadcrumbs.length === 1 ? (
								<span className='main'>{text}</span>
							) : index === breadcrumbs.length - 1 ? (
								text
							) : (
								<NavLink to={href}>{text} |</NavLink>
							)}
						</li>
					))}
				</Ul>
			</Wrap>
			{!(breadcrumbs.length === 1) && (
				<div className='wrap-previous'>
					<Button onClick={() => navigate(-1)} startIcon={<IconArrowDown />}>
						Previous Page
					</Button>
				</div>
			)}
		</Container>
	)
}
