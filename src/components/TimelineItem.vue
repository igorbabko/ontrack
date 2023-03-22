<script setup>
import { ref } from 'vue';

defineProps(['hour', 'activities'])

const timerState = ref('stopped');
</script>

<template>
  <li class="h-24 border m-2 p-4 flex items-center">
    {{ hour.id }}
    <select class="p-4 ml-4 mr-auto">
      <option v-for="activity in activities" :selected="activity.name === hour.activity">{{ activity.name }}</option>
    </select>
    <button v-if="timerState !== 'stopped'" @click="timerState = 'stopped'">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
      </svg>
    </button>
    <button v-if="timerState === 'running'" @click="timerState = 'paused'">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>
    </button>
    <button v-else @click="timerState = 'running'">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    </button>
  </li>
</template>
