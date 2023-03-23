import { Skeleton } from '@mui/material'

export const ListSkeleton = () => {
	return (
		<>
			<Skeleton variant='rounded' width='100%' height={170} />
			<Skeleton variant='rounded' width='100%' height={170} />
			<Skeleton variant='rounded' width='100%' height={170} />
			<Skeleton variant='rounded' width='100%' height={170} />
		</>
	)
}
