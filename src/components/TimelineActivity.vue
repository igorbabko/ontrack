<script setup>
import BaseSelect from './BaseSelect.vue'

defineProps(['activityId', 'activities', 'time']);

const emit = defineEmits(['selectActivity']);
</script>

<template>
  <div class="mr-auto">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      :disabled="(new Date).getHours() >= time"
      placeholder="Rest"
      @change="emit('selectActivity', $event)" />
  </div>
</template>
