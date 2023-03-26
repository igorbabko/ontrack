<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import ActivityGoal from './ActivityGoal.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['activity', 'timelineItems']);

const emit = defineEmits(['delete', 'setSecondsToComplete']);

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
    <span class="mr-auto truncate">{{ activity.name }}</span>
    <ActivityGoal
      v-if="activity.secondsToComplete"
      :activity="activity"
      :timeline-items="timelineItems" />
    <BaseSelect
      :selected="activity.secondsToComplete || null"
      :options="options"
      placeholder="Goal"
      @select="emit('setSecondsToComplete', $event)" />
  </li>
</template>
