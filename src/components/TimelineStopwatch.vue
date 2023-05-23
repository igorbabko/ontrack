<script setup>
import { ref } from 'vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import {
  MILLISECONDS_IN_SECOND,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER
} from '../constants'
import { formatSeconds } from '../functions'
import { isNumber } from '../validators'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  seconds: {
    default: 0,
    type: Number,
    validator: isNumber
  }
})

const seconds = ref(props.seconds)
const isRunning = ref(false)

function start() {
  isRunning.value = setInterval(() => {
    seconds.value++
  }, MILLISECONDS_IN_SECOND)
}

function stop() {
  clearInterval(isRunning.value)

  isRunning.value = false
}

function reset() {
  stop()

  seconds.value = 0
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
