import { useToggle } from 'hooks/useToggle'
import { useState } from 'react'

export const useUpload = () => {
	const [value, setValue] = useState(0)
	const [open, toggle, setToggle] = useToggle()

	const handleClose = () => {
		setToggle(false)
		setValue(0)
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return { open, value, toggle, handleClose, handleChange }
}
