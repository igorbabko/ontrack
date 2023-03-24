<script setup>
import BaseSelect from './BaseSelect.vue'

defineProps(['activityId', 'activities']);
defineEmits(['selectActivity']);
</script>

<template>
  <div class="mr-auto ml-4">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      placeholder="Pick Activity"
      @change="emit('changeActivity', $event)" />
  </div>
</template>
