<script setup>
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '../constants'
import { formatSeconds } from '../functions'
import { isNumber } from '../validators'
import BaseButton from './BaseButton.vue'

defineProps({
  seconds: {
    default: 0,
    type: Number,
    validator: isNumber
  }
})
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton :type="BUTTON_TYPE_WARNING">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton :type="BUTTON_TYPE_SUCCESS">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
