<script setup>
import BaseSelect from './BaseSelect.vue'

defineProps(['activityId', 'activities', 'time']);

const emit = defineEmits(['select']);
</script>

<template>
  <div class="mr-auto">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      :disabled="(new Date).getHours() >= time"
      placeholder="Rest"
      @change="emit('select', $event)" />
  </div>
</template>
