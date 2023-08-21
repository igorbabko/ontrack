<script setup>
import { watch } from 'vue'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '../constants'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '../icons'
import { currentHour, formatSeconds } from '../functions'
import { isTimelineItemValid } from '../validators'
import { updateTimelineItem } from '../timeline-items'
import { useStopwatch } from '../composables/stopwatch'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const { seconds, isRunning, start, stop, reset } = useStopwatch(
  props.timelineItem.activitySeconds,
  updateTimelineItemActivitySeconds
)

watch(() => props.timelineItem.activityId, updateTimelineItemActivitySeconds)

function updateTimelineItemActivitySeconds() {
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value
  })
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="timelineItem.hour !== currentHour()"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
