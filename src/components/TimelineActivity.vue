<script setup>
import BaseSelect from './BaseSelect.vue'
import BaseButton from './BaseButton.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps(['activityId', 'activities', 'time']);

const emit = defineEmits(['select']);
</script>

<template>
  <div class="mr-auto flex gap-2">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      :disabled="(new Date).getHours() >= time"
      placeholder="Pick Activity"
      @change="emit('select', $event.target.value)" />
    <BaseButton
      v-if="activityId && (new Date).getHours() < time"
      type="danger"
      @click="emit('select', null)">
      <XMarkIcon class="h-5 w-5" />
    </BaseButton>
  </div>
</template>
