<script setup>
import { ref, computed } from 'vue';
import StopwatchButtonReset from './StopwatchButtonReset.vue';
import StopwatchButtonStart from './StopwatchButtonStart.vue';
import StopwatchButtonStop from './StopwatchButtonStop.vue';
import StopwatchTime from './StopwatchTime.vue';

const props = defineProps({
  forCurrentHour: Boolean,
  time: Number,
});

const isRunning = ref(false);
const time = ref(props.time);

let stopwatch = null;

const date = new Date();

const formattedTime = computed(() => {
  date.setTime(time.value * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
});

const shouldShowTime = computed(() => time.value || isRunning.value);

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
</script>

<template>
  <template v-if="shouldShowTime">
    <StopwatchButtonReset v-if="forCurrentHour" @click="reset" />
    <StopwatchTime>{{ formattedTime }}</StopwatchTime>
  </template>
  <StopwatchButtonStop v-if="isRunning" @click="pause" />
  <StopwatchButtonStart v-else-if="forCurrentHour" @click="start" />
</template>
