<script setup>
import { periodSelectOptions } from '@/config';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import ActivityGoal from './ActivityGoal.vue';

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
      class="font-mono"
      :selected="activity.secondsToComplete"
      :options="periodSelectOptions"
      @select="emit('setSecondsToComplete', $event)" />
  </li>
</template>
