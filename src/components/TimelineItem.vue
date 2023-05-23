<script setup>
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  NULLABLE_ACTIVITY
} from '../constants'
import {
  isTimelineItemValid,
  isActivityValid,
  validateSelectOptions,
  validateActivities
} from '../validators'
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions
  }
})

const emit = defineEmits({
  selectActivity: isActivityValid
})

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="selectActivity"
    />
    <div class="flex w-full gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER">
        <ArrowPathIcon class="h-8" />
      </BaseButton>
      <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
        00:00:00
      </div>
      <BaseButton :type="BUTTON_TYPE_WARNING">
        <PauseIcon class="h-8" />
      </BaseButton>
      <BaseButton :type="BUTTON_TYPE_SUCCESS">
        <PlayIcon class="h-8" />
      </BaseButton>
    </div>
  </li>
</template>
