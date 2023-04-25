import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'

export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0

export const NAV_ITEMS = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon
}

export const PERIOD_SELECT_OPTIONS = [
  {
    value: 15,
    label: '0:15'
  },
  {
    value: 30,
    label: '0:30'
  },
  {
    value: 45,
    label: '0:45'
  }
]
