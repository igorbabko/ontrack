<script setup>
import { ref } from 'vue';

defineProps(['activities', 'goals']);

const emit = defineEmits(['create']);

const title = ref('');

function add() {
  emit('add', title.value);

  title.value = '';
}
</script>

<template>
  <div>
    <ul class="divide-y">
      <li v-for="activityName, activityId in activities" class="p-4 flex justify-between items-center">
        {{ activityName }}
        <select class="p-1 px-2 rounded">
          <option v-for="timeRange in [30, 60, 120]" :selected="timeRange === goals[activityId]">{{ timeRange }} min
          </option>
        </select>
      </li>
    </ul>
    <form @submit.prevent="add" class="p-4 w-full flex justify-between gap-2">
      <input type="text" v-model="title" class="border flex-grow rounded px-2" placeholder="Activity name">
      <button class="bg-purple-900 text-white p-1 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </form>
  </div>
</template>
