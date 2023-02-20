import { useState, useCallback } from 'react'

type ToggleType = [boolean, () => void, (value: boolean) => void]

export const useToggle = (initialState = false): ToggleType => {
	const [value, setValue] = useState(initialState)

	const toggle = () => setValue(!value)

	const setToggle = useCallback((value: boolean) => setValue(value), [])

	return [value, toggle, setToggle]
}
