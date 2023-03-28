<script setup>
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['submit']);

const name = ref('');

function submit() {
  emit('submit', name.value);

  name.value = '';
}
</script>

<template>
  <form @submit.prevent="submit" class="p-4 w-full flex justify-between gap-2">
    <input type="text" v-model="name" class="border flex-grow rounded px-2" placeholder="Activity name">
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
