<script setup>
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue'

const props = defineProps({
  selected: String | Number,
  disabled: Boolean,
  options: Array,
  placeholder: String
});

const emit = defineEmits(['select']);

const isNotSelected = computed(() => [null, undefined].includes(props.selected));
</script>

<template>
  <div class="flex gap-1">
    <BaseButton
      type="neutral"
      :disabled="disabled"
      @click="emit('select', null)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      class="w-full py-1 px-2 text-2xl rounded bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="disabled"
      @change="emit('select', $event.target.value)">
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
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
