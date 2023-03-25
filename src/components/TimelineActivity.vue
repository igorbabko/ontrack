<script setup>
import BaseSelect from './BaseSelect.vue'

defineProps(['activityId', 'activities']);

const emit = defineEmits(['selectActivity']);
</script>

<template>
  <div class="mr-auto">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      placeholder="Rest"
      @change="emit('selectActivity', $event)" />
  </div>
</template>
