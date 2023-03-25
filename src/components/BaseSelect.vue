<script setup>
import BaseButton from './BaseButton.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps(['selected', 'options', 'placeholder']);

const emit = defineEmits(['select']);
</script>

<template>
  <div class="flex gap-1">
    <BaseButton type="neutral" @click="emit('select', null)">
      <XMarkIcon class="h-4 w-4" />
    </BaseButton>
    <select @change="emit('select')" class="py-1 px-2 rounded bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed">
      <option disabled value="" :selected="[null, undefined].includes(selected)">{{ placeholder }}</option>
      <option
        v-for="label, value in options"
        :selected="value == selected"
        :value="value">
        {{ label }}
      </option>
    </select>
  </div>
</template>
