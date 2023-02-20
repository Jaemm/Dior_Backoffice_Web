import { Container } from './style'
import { Skeleton } from '@mui/material'
import { useToggle } from 'hooks/useToggle'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ImageTypes {
	src: string
}

export const Image = ({ src }: ImageTypes) => {
	const [loading, toggle] = useToggle(true)
	return (
		<Container>
			{loading && (
				<div className='loading'>
					<Skeleton variant='rectangular' width='100%' height='100%' />
				</div>
			)}
			<LazyLoadImage
				src={src}
				width='100%'
				effect='blur'
				height='150px'
				alt='trailer.png'
				afterLoad={toggle}
				onError={(e: any) => {
					e.target.onerror = null
				}}
			/>
		</Container>
	)
}
