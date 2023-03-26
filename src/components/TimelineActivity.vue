<script setup>
import { computed } from 'vue';
import { getCurrentHour } from '../functions.js';
import BaseSelect from './BaseSelect.vue'

const props = defineProps(['activityId', 'activities', 'hour']);

const emit = defineEmits(['select']);

const options = computed(() => props.activities.map(({ id, name }) => ({ value: id, label: name })));
</script>

<template>
  <div class="mr-auto flex gap-2">
    <BaseSelect
      :selected="activityId"
      :options="options"
      :disabled="hour <= getCurrentHour()"
      placeholder="Rest"
      @select="emit('select', $event)" />
  </div>
</template>
