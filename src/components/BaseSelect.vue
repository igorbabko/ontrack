<script setup>
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue'

const props = defineProps(['selected', 'options', 'placeholder']);

const emit = defineEmits(['select']);

const isNotSelected = computed(() => [null, undefined].includes(props.selected));
</script>

<template>
  <div class="flex gap-2">
    <BaseButton
      type="neutral"
      @click="emit('select', null)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      class="w-full py-1 px-2 text-2xl rounded bg-gray-100 truncate"
      @change="emit('select', $event.target.value)">
      <option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :selected="value === selected"
        :value="value">
        {{ label }}
      </option>
    </select>
  </div>
</template>
