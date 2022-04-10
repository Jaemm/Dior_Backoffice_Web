import Cookies from 'js-cookie'

export function setCookie(name: string, value: string | object) {
  Cookies.set(name, value)
}

export function getCookie(name: string) {
  return Cookies.get(name)
}

export function removeCookie(name: string) {
  Cookies.remove(name)
}

export function removeCookies(names: string[]) {
  names.forEach((name) => {
    removeCookie(name)
  })
}
