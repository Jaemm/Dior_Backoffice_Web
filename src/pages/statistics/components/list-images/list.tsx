import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'
import { Wrap, Container, WrapSwiper } from './style'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useList } from './useList'
import { IconButton, Skeleton } from '@mui/material'
import { Image } from '../image'
import { ReactComponent as IconArrowLeft } from 'assets/icons/arrow-left.svg'

export const ListImages = () => {
	const { data, isLoading } = useList()

	return (
		<Container>
			{isLoading ? (
				<Skeleton variant='rounded' width='100%' height={140} />
			) : (
				<Wrap>
					<IconButton className='prev'>
						<IconArrowLeft />
					</IconButton>
					<WrapSwiper>
						<Swiper
							slidesPerView={4}
							spaceBetween={30}
							slidesPerGroup={4}
							modules={[Navigation]}
							className='mySwiper'
							navigation={{
								prevEl: '.prev',
								nextEl: '.next',
							}}
						>
							{data.data.map((v: any) => (
								<SwiperSlide key={v.id}>
									<Image src={v.image_url} />
								</SwiperSlide>
							))}
						</Swiper>
					</WrapSwiper>
					<IconButton className='next'>
						<IconArrowLeft />
					</IconButton>
				</Wrap>
			)}
		</Container>
	)
}
