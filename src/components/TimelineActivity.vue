<script setup>
import { computed } from 'vue';
import { getCurrentHour, generateActivitySelectOptions } from '../functions.js';
import BaseSelect from './BaseSelect.vue'

const props = defineProps(['activityId', 'activities', 'hour']);

const emit = defineEmits(['select']);

const activitySelectOptions = computed(() => generateActivitySelectOptions(props.activities));
</script>

<template>
  <div class="mr-auto flex gap-2">
    <BaseSelect
      :selected="activityId"
      :options="activitySelectOptions"
      :disabled="hour <= getCurrentHour()"
      placeholder="Rest"
      @select="emit('select', $event)" />
  </div>
</template>
