<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['activity', 'goals', 'timelineItems']);

const emit = defineEmits(['delete', 'setGoal']);

const options = {
  30: '30 min',
  60: '60 min',
  90: '90 min',
  120: '120 min',
};

function totalActivityTime() {
  return props.timelineItems
    .filter((timelineItem) => timelineItem.activityId === props.activity.id)
    .reduce((total, timelineItem) => Math.round((timelineItem.time / 60) + total), 0);
}
</script>

<template>
  <li class="p-4 flex gap-2">
    <BaseButton type="danger" @click="emit('delete')">
      <XMarkIcon class="h-4 w-4" />
    </BaseButton>
    <span class="mr-auto flex items-center">{{ activity.name }}</span>
    <div class="ml-4 px-2 rounded"
      :class="goals[activity.id] - totalActivityTime() < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'">
      {{ goals[activity.id] - totalActivityTime() }} min
    </div>
    <BaseSelect
      :selected="goals[activity.id]"
      :options="options"
      placeholder="Goal"
      @select="emit('setGoal', { activityId: activity.id, time: $event })" />
  </li>
</template>
