import axios from 'axios'
import { getUser } from 'utils/getUser'
import { clearStorage } from 'utils/clearStorage'
import { isExpiredToken } from 'utils/isExpiredToken'

const baseURL = process.env.REACT_APP_BASE_URL

const request = axios.create({
	baseURL,
	headers: {
		Accept: '*/*',
		Connection: 'keep-alive',
		'Content-Type': 'application/json',
	},
})

request.interceptors.request.use(
	async (config: any) => {
		const { user } = getUser()

		if (user?.token) {
			const { isExpiredDay, isExpiredWeek } = isExpiredToken()

			if (isExpiredWeek < 1 || isExpiredDay < 0) {
				clearStorage()
				window.location.href = '/login'
				return config
			}

			if (isExpiredDay > 1) {
				config.headers = {
					...config.headers,
					'X-CHOWIS-CONSULTANT-TOKEN': user.token,
				}
				return config
			}

			return config
		}

		return config
	},
	error => Promise.reject(error),
)

export { request }
