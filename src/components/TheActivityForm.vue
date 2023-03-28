<script setup>
import { ref, nextTick } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['submit']);

const name = ref('');

async function submit() {
  emit('submit', name.value);

  name.value = '';

  await nextTick();

  window.scrollTo(0, document.body.scrollHeight);
}
</script>

<template>
  <form @submit.prevent="submit" class="p-4 flex gap-2 sticky bottom-[57px] bg-white border-t">
    <input type="text" v-model="name" class="border rounded px-4 w-full text-xl" placeholder="Activity name">
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
