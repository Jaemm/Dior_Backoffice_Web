import { useMemo } from 'react'

import { getCookie, setCookie } from '../helpers/CookieHelpers'
import { LanguageCodes } from './config'

const LANGUAGE_COOKIE_KEY = 'APP_LANGUAGE'
const DEFAULT_FALLBACK_LANGUAGE = window.location.hostname === 'cn.chowispartner.com' ? 'zh' : 'kr'
export const APP_LANGUAGES = [
  { code: 'kr', value: '한국어' },
  { code: 'en', value: 'English' },
  { code: 'jp', value: '日本' },
  { code: 'ru', value: 'Pусский' },
  { code: 'zh', value: '简体中文' },
  { code: 'zf', value: '繁体中文' },
]

export function useAppLanguage(
  fallback: LanguageCodes = DEFAULT_FALLBACK_LANGUAGE
): [string, (lang: string) => void] {
  const currentLanguage = useMemo(() => getCookie(LANGUAGE_COOKIE_KEY) || fallback, [fallback])

  const setLanguage = (language: string) => {
    setCookie(LANGUAGE_COOKIE_KEY, language)
    window.location.reload()
  }

  return [currentLanguage, setLanguage]
}
