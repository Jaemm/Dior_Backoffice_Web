import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { getCookie } from '../helpers/CookieHelpers'
import translationEN from './en/translation.json'
import translationJP from './jp/translation.json'
import translationKR from './kr/translation.json'
import translationRU from './ru/translation.json'
import translationZF from './zf/translation.json'
import translationZH from './zh/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
  kr: {
    translation: translationKR,
  },
  jp: {
    translation: translationJP,
  },
  ru: {
    translation: translationRU,
  },
  zh: {
    translation: translationZH,
  },
  zf: {
    translation: translationZF,
  },
} as const

export type LanguageCodes = keyof [typeof resources]['0']

i18n.use(initReactI18next).init({
  lng:
    getCookie('APP_LANGUAGE') ||
    (window.location.hostname === 'cn.chowispartner.com' ? 'en' : 'en'),
  resources,
})
