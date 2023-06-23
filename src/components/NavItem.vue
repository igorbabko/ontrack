<script setup>
import { computed } from 'vue'
import { isPageValid } from '../validators'
import { currentPage, navigate } from '../router'

const props = defineProps({
  page: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'pointer-events-none bg-gray-200': props.page === currentPage.value }
])
</script>

<template>
  <li class="flex-1">
    <a :href="`#${page}`" :class="classes" @click="navigate(page)">
      <slot></slot>
    </a>
  </li>
</template>
