<script setup>
import BaseButton from './BaseButton.vue'
import BaseSelect from './BaseSelect.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps(['activity', 'goals']);
const emit = defineEmits(['delete']);

const options = {
  30: '30 min',
  60: '60 min',
  90: '90 min',
  120: '120 min',
};
</script>

<template>
  <li class="p-4 flex gap-2 items-center">
    <span class="mr-auto">{{ activity.name }}</span>
    <BaseSelect :selected="goals[activity.id] || 0" :options="options" placeholder="0" />
    <BaseButton type="danger" @click="emit('delete', activity)">
      <XMarkIcon class="h-5 w-5" />
    </BaseButton>
  </li>
</template>
