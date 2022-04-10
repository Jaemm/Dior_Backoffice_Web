import { format, parse } from 'date-fns'

export function parseDateString(date: string, fallback?: string) {
  try {
    let val = date
    if (!val) {
      return fallback
    }

    console.log(val)
    return format(new Date(val), 'yyyy-MM-dd')
  } catch (error) {
    return fallback
  }
}
