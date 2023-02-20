import { DialogType } from 'types'
import { ChangeEventHandler } from 'react'
import { useToggle } from 'hooks/useToggle'
import { useNavigate } from 'react-router-dom'
import { clearStorage } from 'utils/clearStorage'
import { useQueryClient } from '@tanstack/react-query'

export const useLogOut = () => {
	const queryClient = useQueryClient()

	const navigate = useNavigate()
	const [open, toggle, setToggle] = useToggle()

	const handleLogOut = async () => {
		await toggle()
		await clearStorage()
		await queryClient.clear()
		await navigate('/')
	}

	const handleDialog = (e: ChangeEventHandler, reason: DialogType) => {
		if (reason !== 'backdropClick') {
			setToggle(false)
		}
	}

	return { open, toggle, handleDialog, handleLogOut }
}
