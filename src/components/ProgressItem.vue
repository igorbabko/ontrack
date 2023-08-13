<script setup>
import { computed } from 'vue'
import { getActivityProgress } from '../activities'

const props = defineProps(['index', 'activity'])

const color = ['red', 'yellow', 'blue', 'green'][props.index]
const timeProgress = ['03:00 / 30:00', '15:00 / 30:00', '21:00 / 30:00', '30:00 / 30:00'][
  props.index
]

const progress = computed(() => getActivityProgress(props.activity))
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="`bg-${color}-500`" :style="`width: ${progress}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
