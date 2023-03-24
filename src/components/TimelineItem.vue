<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['timelineItem', 'activities', 'hour']);
const emit = defineEmits(['selectActivity']);

const timerState = ref('paused');

let stopwatch = null;

const time = ref(props.timelineItem.time);

function start() {
  timerState.value = 'running';

  stopwatch = setInterval(() => {
    time.value++;
  }, 1000);
}

function reset() {
  time.value = 0;
}

function pause() {
  timerState.value = 'paused';

  clearInterval(stopwatch);
}

// function stop() {
//   timerState.value = 'stopped';
//   time.value = 0;

//   clearInterval(stopwatch);
// }

const date = new Date(null);

const formattedTime = computed(() => {
  date.setTime(time.value * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
});
</script>

<template>
  <li class="p-4 flex items-center">
    <div class="flex flex-col items-center">
      <span
        class="font-black"
        :class="[
          { 'font-black text-purple-500': hour === 3 },
          { 'text-slate-300': [0, 1, 2].includes(hour) }
        ]">{{ hour }}</span>

      <!-- <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->

      <!-- <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
    </div>
    <div class="flex gap-2 mr-auto ml-4">
      <select class="py-1 px-2 rounded" @change="emit('changeActivity', $event)">
        <option v-for="name, id in { name: 'Rest', ...activities }"
          :selected="id === timelineItem.activityId">{{
            name }}</option>
      </select>
    </div>
    <div v-if="time || timerState !== 'paused'" class="flex">
      <button class="mr-2" @click="reset">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
      <div class="font-mono mr-6">{{ formattedTime }}</div>
    </div>
    <!-- <button v-if="time || timerState !== 'stopped'" @click="stop">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                </svg>
              </button> -->

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
  </li>
</template>
