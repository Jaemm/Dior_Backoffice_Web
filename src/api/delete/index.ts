import { request } from 'api/request'
import { diorTypes } from 'types'

export const deleteData = ({ type, ids }: { type: diorTypes; ids: number[] }) =>
	request.delete(`api/dior/${type}/delete_multiple`, { data: { ids } })
