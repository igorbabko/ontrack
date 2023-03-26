<script>
const selectOptions = generateSelectOptions();

function generateSelectOptions() {
  const periodsInMinutes = [15, 30, 45, 60, 90, 120, 150];

  return periodsInMinutes.map((period) => {
    const hours = Math.floor(period / 60);
    const minutes = period % 60;

    let label = ''

    if (hours && minutes) {
      label = `${hours}:${minutes} hr`;
    } else if (hours) {
      label = `${hours} hr`;
    } else {
      label = `${minutes} min`;
    }

    return {
      value: period,
      label
    };
  });
}
</script>

<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import ActivityGoal from './ActivityGoal.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['activity', 'timelineItems']);

const emit = defineEmits(['delete', 'setSecondsToComplete']);
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
      :options="selectOptions"
      placeholder="Goal"
      @select="emit('setSecondsToComplete', $event)" />
  </li>
</template>
