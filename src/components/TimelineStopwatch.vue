<script setup>
import { ref, computed } from 'vue';
import StopwatchButtonReset from './StopwatchButtonReset.vue';
import StopwatchButtonStart from './StopwatchButtonStart.vue';
import StopwatchButtonStop from './StopwatchButtonStop.vue';
import StopwatchTime from './StopwatchTime.vue';

const props = defineProps(['time']);

const isRunning = ref(false);

let stopwatch = null;

const time = ref(props.time);

function start() {
  isRunning.value = true;

  stopwatch = setInterval(() => time.value++, 1000);
}

function reset() {
  time.value = 0;
}

function pause() {
  isRunning.value = false;

  clearInterval(stopwatch);
}

// function stop() {
//   timerState.value = 'stopped';
//   time.value = 0;

//   clearInterval(stopwatch);
// }

const date = new Date();

const formattedTime = computed(() => {
  date.setTime(time.value * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
});

const shouldShowTime = computed(() => time.value || isRunning.value);
</script>

<template>
  <template v-if="shouldShowTime">
    <StopwatchButtonReset @click="reset" />
    <StopwatchTime>{{ formattedTime }}</StopwatchTime>
  </template>
  <StopwatchButtonStop v-if="isRunning" @click="pause" />
  <StopwatchButtonStart v-else @click="start" />
</template>
