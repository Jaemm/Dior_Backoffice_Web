import { clearUserData } from '../data/UserState'

export function Logout() {
  clearUserData()
  window.location.replace('/login')

  return null
}
