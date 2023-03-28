<script>
import { generatePeriodSelectOptions } from '../functions';

const periodSelectOptions = generatePeriodSelectOptions();
</script>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue';

defineProps(['activity', 'timelineItems']);

const emit = defineEmits(['delete', 'setSecondsToComplete']);
</script>

<template>
  <li class="p-4 flex flex-col gap-1">
    <div class="flex items-center gap-1">
      <BaseButton type="danger" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity.name }}</span>
    </div>
    <div class="flex gap-1">
      <BaseSelect
        class="font-mono flex-grow"
        :selected="activity.secondsToComplete || null"
        :options="periodSelectOptions"
        placeholder="h:mm"
        @select="emit('setSecondsToComplete', parseInt($event || 0))" />
      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
        :timeline-items="timelineItems" />
    </div>
  </li>
</template>
