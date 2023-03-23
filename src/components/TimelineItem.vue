<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['hour', 'activities'])

const timerState = ref('stopped');

let stopwatch = null;

const time = ref(props.hour.time);

function start() {
  timerState.value = 'running';

  stopwatch = setInterval(() => {
    time.value++;
  }, 1000);
}

function pause() {
  timerState.value = 'paused';

  clearInterval(stopwatch);
}

function stop() {
  timerState.value = 'stopped';
  time.value = 0;

  clearInterval(stopwatch);
}

const date = new Date(null);

const formattedTime = computed(() => {
  date.setTime(time.value * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
});
</script>

<template>
  <li class="h-24 p-4 flex items-start">
    <div class="flex flex-col items-center">
      <span>{{ hour.id }}</span>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <!-- <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div> -->
    </div>
    <div class="flex flex-col mr-auto ml-4 space-y-1">
      <select class="p-1 px-2 rounded">
        <option v-for="activity in [{name: 'Rest'}, ...activities]" :selected="activity.name === hour.activity">{{ activity.name }}</option>
      </select>
      <select v-if="hour.activity !== 'Rest'" class="p-1 px-2 rounded">
        <option v-for="timeRange in [15, 30, 45]" :selected="timeRange === hour.timeRange">{{ timeRange }} min</option>
      </select>
    </div>
    <div class="flex flex-col items-end">
      <div v-if="time || timerState !== 'stopped'" class="font-mono">{{ formattedTime }}</div>
      <div>
        <button v-if="time || timerState !== 'stopped'" @click="stop">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
          </svg>
        </button>
        <button v-if="timerState === 'running'" @click="pause">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        </button>
        <button v-else @click="start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        </button>
      </div>
    </div>
  </li>
</template>
