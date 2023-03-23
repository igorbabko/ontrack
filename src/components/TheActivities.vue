<script setup>
import { ref } from 'vue';
import BaseButtonFloating from './BaseButtonFloating.vue';

defineProps(['activities', 'goals']);

const emit = defineEmits(['create']);

const title = ref('');

function add() {
  emit('add', title.value);

  title.value = '';
}
</script>

<template>
  <ul>
    <li v-for="activity in activities" class="h-24 border m-2 p-4 flex justify-between items-center">
      {{ activity.name }}
      <select class="p-1 px-2 rounded">
        <option v-for="timeRange in [30, 60, 120]" :selected="timeRange === goals[activity.name]">{{ timeRange }} min</option>
      </select>
    </li>
    <li class="h-24 border m-2 flex p-4 items-center">
      <form @submit.prevent="add" class="w-full flex justify-between">
        <input type="text" v-model="title" class="border bg-gray-100 p-2 flex-grow" placeholder="Activity name">
        <button class="bg-purple-900 text-white py-1 px-2 rounded">Add</button>
      </form>
    </li>
  </ul>
  <!-- <BaseButtonFloating /> -->
</template>
