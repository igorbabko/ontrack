<script setup>
import { onUpdated } from 'vue';
import BaseButton from './BaseButton.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps(['selected', 'options', 'placeholder']);

const emit = defineEmits(['select']);

// onUpdated(() => {
//   console.log('updated');
// });
</script>

<template>
  <div class="flex gap-1">
    <select
      class="py-1 px-2 rounded bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
      @change="emit('select', $event.target.value)">
      <option :selected="[null, undefined].includes(selected)" disabled value="">
        {{ placeholder }}
      </option>
      <option v-for="label, value in options" :selected="value == selected" :value="value">
        {{ label }}
      </option>
    </select>
    <BaseButton type="neutral" @click="emit('select', null)">
      <XMarkIcon class="h-4 w-4" />
    </BaseButton>
  </div>
</template>
