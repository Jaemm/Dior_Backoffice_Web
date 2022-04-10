import { stringify } from 'query-string'

export function generateURL(
  path: string,
  qs: Record<string, string | number | boolean | undefined | null> | undefined
) {
  return qs ? `${path}?${stringify(qs)}` : path
}
