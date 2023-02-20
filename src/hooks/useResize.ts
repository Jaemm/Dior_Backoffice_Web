import { useEffect, useRef, useState } from 'react'

export const useResize = () => {
	const [height, setHeight] = useState(0)
	const [width, setWidth] = useState(0)
	const ref = useRef<HTMLDivElement>(null)

	const handleResize = () => {
		if (ref.current) {
			setHeight(ref.current.clientHeight)
			setWidth(ref.current.clientWidth)
		}
	}

	useEffect(() => {
		handleResize()
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	})

	return { ref, height, width }
}
