import { APP_NAME } from './constants'
import { today } from './time'

export function load() {
  const state = localStorage.getItem(APP_NAME)

  return state ? JSON.parse(state) : {}
}

export function save(data) {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      ...data,
      date: today().toDateString()
    })
  )
}
