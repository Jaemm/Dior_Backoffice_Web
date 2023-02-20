import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import { getUser } from 'utils/getUser'

interface TokenTypes {
	app_id: number
	consultant_id: number
	email: string
	exp: number
	name: string
}

export const isExpiredToken = () => {
	const { user } = getUser()
	const jwt_user: TokenTypes = jwt_decode(user.token)
	const isExpiredDay = dayjs.unix(jwt_user.exp).diff(dayjs())
	const isExpiredWeek = dayjs.unix(jwt_user.exp).add(7, 'day').diff(dayjs())

	return { isExpiredDay, isExpiredWeek }
}
