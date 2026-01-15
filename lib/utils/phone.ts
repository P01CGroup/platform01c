import { parsePhoneNumberFromString, AsYouType, type CountryCode } from 'libphonenumber-js'

export function formatPhone(number: string, country: string) {
  const cc = (country || '').toUpperCase() as CountryCode
  const formatter = new AsYouType(cc)
  return formatter.input(number)
}

export function isValidPhone(number: string, country: string) {
  const cc = (country || '').toUpperCase() as CountryCode
  const parsed = parsePhoneNumberFromString(number, cc)
  return parsed ? parsed.isValid() : false
}

export function normalizePhone(number: string, country: string) {
  const cc = (country || '').toUpperCase() as CountryCode
  const parsed = parsePhoneNumberFromString(number, cc)
  return parsed ? parsed.number : number
}
