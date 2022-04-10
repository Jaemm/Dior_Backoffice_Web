import i18n from 'i18next'

export function parseGender(value: number | null | undefined | string) {
  const genderConst = typeof value === 'string' ? parseInt(value, 10) : value

  switch (genderConst) {
    case 1:
      return i18n.t('male')
    case 2:
      return i18n.t('female')
    default:
      return 'XX'
  }
}


export function formatNumber(value: number){
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}