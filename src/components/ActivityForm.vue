<script setup>
import { ref } from 'vue';

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
    <button class="bg-purple-900 text-white p-1 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </form>
</template>
