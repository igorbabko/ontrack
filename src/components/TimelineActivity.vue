<script setup>
import BaseSelect from './BaseSelect.vue'

const props = defineProps(['activityId', 'activities']);
</script>

<template>
  <div class="flex gap-2 mr-auto ml-4">
    <BaseSelect
      :selected="activityId"
      :options="activities"
      placeholder="Pick Activity"
      @change="emit('changeActivity', $event)" />
  </div>
</template>
