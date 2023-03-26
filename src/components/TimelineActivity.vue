<script setup>
import BaseSelect from './BaseSelect.vue'

defineProps(['activityId', 'activities', 'hour']);

const emit = defineEmits(['select']);
</script>

<template>
  <div class="mr-auto flex gap-2">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      :disabled="hour <= (new Date).getHours()"
      placeholder="Rest"
      @select="emit('select', $event)" />
  </div>
</template>
