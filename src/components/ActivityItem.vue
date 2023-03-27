<script>
import { generatePeriodSelectOptions } from '../functions';

const periodSelectOptions = generatePeriodSelectOptions();
</script>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue';

const props = defineProps(['activity', 'timelineItems']);

const emit = defineEmits(['delete', 'setSecondsToComplete']);
</script>

<template>
  <li class="p-4 flex gap-2">
    <BaseButton type="danger" @click="emit('delete')">
      <XMarkIcon class="h-4 w-4" />
    </BaseButton>
    <span class="mr-auto truncate">{{ activity.name }}</span>
    <ActivitySecondsToComplete
      v-if="activity.secondsToComplete"
      :activity="activity"
      :timeline-items="timelineItems" />
    <BaseSelect
      class="font-mono"
      :selected="activity.secondsToComplete || null"
      :options="periodSelectOptions"
      placeholder="h:mm"
      @select="emit('setSecondsToComplete', parseInt($event || 0))" />
  </li>
</template>
