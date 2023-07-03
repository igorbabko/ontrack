<script setup>
import { inject } from 'vue'
import { NULLABLE_ACTIVITY } from '../constants'
import { isTimelineItemValid, isActivityValid, isHourValid } from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid
})

const activitySelectOptions = inject('activitySelectOptions')
const activities = inject('activities')

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="selectActivity"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
