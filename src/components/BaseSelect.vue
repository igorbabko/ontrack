<script setup>
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue'

const props = defineProps(['selected', 'options', 'placeholder']);

const emit = defineEmits(['select']);

const isNotSelected = computed(() => [null, undefined].includes(props.selected));
</script>

<template>
  <div class="flex gap-1">
    <select
      class="py-1 px-2 text-sm rounded bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      @change="emit('select', $event.target.value)">
      <option v-if="placeholder" :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :selected="value == selected"
        :value="value">
        {{ label }}
      </option>
    </select>
    <BaseButton
      type="neutral"
      :disabled="isNotSelected"
      @click="emit('select', null)">
      <XMarkIcon class="h-4 w-4" />
    </BaseButton>
  </div>
</template>
