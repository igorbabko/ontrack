<script setup>
import { ref } from 'vue';
import BaseButton from './BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['add']);

const name = ref('');

function submit() {
  emit('add', name.value);

  name.value = '';
}
</script>

<template>
  <form @submit.prevent="submit" class="p-4 w-full flex justify-between gap-2">
    <input type="text" v-model="name" class="border flex-grow rounded px-2" placeholder="Activity name">
    <BaseButton :disabled="name === ''">
      <PlusIcon class="h-5 w-5" />
    </BaseButton>
  </form>
</template>
