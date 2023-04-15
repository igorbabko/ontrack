<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['timelineItem'])

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.timelineItem.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500'
]

const options = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' }
]
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <a href="#" :class="hourLinkClasses"> {{ timelineItem.hour }}:00 </a>
    <div class="flex gap-2">
      <button
        class="rounded bg-gray-100 p-3 enabled:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <XMarkIcon class="h-8" />
      </button>
      <select name="" id="" class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl">
        <option selected disabled value="">Rest</option>
        <option v-for="{ value, label } in options" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
    </div>
  </li>
</template>
