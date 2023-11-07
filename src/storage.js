import { APP_NAME } from './constants'
import { tomorrow } from './time'

export function load() {
  const rawState = localStorage.getItem(APP_NAME)

  return rawState ? JSON.parse(rawState) : {}
}

export function save(data) {
  localStorage.setItem(APP_NAME, JSON.stringify({ ...data, date: tomorrow().toDateString() }))
}
