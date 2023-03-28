<script setup>
import { computed } from 'vue';
import { getCurrentHour, generateActivitySelectOptions } from '../functions.js';
import BaseSelect from './BaseSelect.vue'

const props = defineProps(['timelineItem', 'activities']);

const emit = defineEmits(['select']);

const activitySelectOptions = computed(() => generateActivitySelectOptions(props.activities));
</script>

<template>
  <div class="mr-auto flex gap-2 w-full">
    <BaseSelect
      class="w-full"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      :disabled="timelineItem.hour < getCurrentHour()"
      placeholder="Rest"
      @select="emit('select', $event)" />
  </div>
</template>
