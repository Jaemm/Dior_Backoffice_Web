import { useState } from 'react'
import Viewer from 'react-viewer'
import { Button } from './style'

interface IAnalysis {
	src: string
}

export const AnalysisImage = ({ src }: IAnalysis) => {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			<Button
				onClick={() => {
					setVisible(true)
				}}
			>
				View Image
			</Button>
			<Viewer
				visible={visible}
				onClose={() => {
					setVisible(false)
				}}
				images={[{ src: `http://images.weserv.nl/?url=https://${src}`, alt: 'Analysis Image' }]}
			/>
		</div>
	)
}
