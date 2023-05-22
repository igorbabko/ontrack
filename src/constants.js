import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

export const BUTTON_TYPE_PRIMARY = 'primary'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_DANGER = 'danger'

export const BUTTON_TYPES = [
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_DANGER
]

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'

export const SECONDS_IN_HOUR = 3600
export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0

export const NAV_ITEMS = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon
}

export const NULLABLE_ACTIVITY = { id: null }

export const PERIOD_SELECT_OPTIONS = [
  {
    value: 1 * SECONDS_IN_HOUR,
    label: '01:00'
  },
  {
    value: 2 * SECONDS_IN_HOUR,
    label: '02:00'
  },
  {
    value: 3 * SECONDS_IN_HOUR,
    label: '03:00'
  }
]
