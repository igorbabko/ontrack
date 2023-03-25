<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import ActivityGoal from './ActivityGoal.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['activity', 'goals', 'timelineItems']);

const emit = defineEmits(['delete', 'setGoal']);

const options = {
  30: '30 min',
  60: '60 min',
  90: '90 min',
  120: '120 min',
};
</script>

<template>
  <li class="p-4 flex gap-2">
    <BaseButton type="danger" @click="emit('delete')">
      <XMarkIcon class="h-4 w-4" />
    </BaseButton>
    <span class="mr-auto flex items-center">{{ activity.name }}</span>
    <ActivityGoal
      v-if="goals[activity.id]"
      :activity="activity"
      :goal="goals[activity.id]"
      :timeline-items="timelineItems" />
    <BaseSelect
      :selected="goals[activity.id] || null"
      :options="options"
      placeholder="Goal"
      @select="emit('setGoal', { activityId: activity.id, time: $event })" />
  </li>
</template>
