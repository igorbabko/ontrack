<script setup>
import { computed } from 'vue'
import { PAGE_TIMELINE } from '../constants'
import { isNavItemValid } from '../validators'
import { currentPage, navigate } from '../router'
import { scrollToCurrentHour } from '../timeline-items'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100'
])

function handleClick() {
  currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
