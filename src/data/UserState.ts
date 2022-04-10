import * as Cookies from 'js-cookie'
import { useMemo } from 'react'

import { UserStateDTO } from '../auth/data/LoginDTO'
import { removeCookie, setCookie } from '../helpers/CookieHelpers'

export function useUserState() {
  const user = useMemo(() => Cookies.get('user_data'), [])

  return JSON.parse(user || '{}') as UserStateDTO
}

export function setUser(user: UserStateDTO) {
  setCookie('user_data', JSON.stringify(user))
}

export function clearUserData() {
  removeCookie('user_data')
}
