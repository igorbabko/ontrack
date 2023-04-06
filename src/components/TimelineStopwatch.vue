<script setup>
import { ref, computed, watch } from 'vue';
import { formatTime, now } from '../functions';
import StopwatchButtonReset from './StopwatchButtonReset.vue';
import StopwatchButtonStart from './StopwatchButtonStart.vue';
import StopwatchButtonStop from './StopwatchButtonStop.vue';
import StopwatchTime from './StopwatchTime.vue';

const props = defineProps({
  timelineItem: Object,
  currentTime: Object,
  isTracking: Boolean,
  isCurrent: Boolean,
  // a: Boolean
});

let stopDate;

// function isSameHour(stopDate) {
//   if (!stopDate) return false;

//   const stopDateWithHour = stopDate.toLocaleString(undefined, { hour12: false }).substring(0, 12);

//   const currentDate = now();
//   const currentDateWithHour = currentDate.toLocaleString(undefined, { hour12: false }).substring(0, 12);

//   console.log('stop: ' + stopDateWithHour);
//   console.log('current: ' + currentDateWithHour);

//   return currentDateWithHour === stopDateWithHour;
// }

let pauseDate = null;

function syncSeconds() {
  if (document.visibilityState === 'visible' && props.timelineItem.startedTrackingAt && props.isCurrent) {
    console.log('1111');

    seconds.value += Math.round((now() - new Date(props.timelineItem.startedTrackingAt)) / 1000);

    start();
  } else if (document.visibilityState === 'visible' && props.isCurrent && props.isTracking) {
    console.log('222222222222');
    const a = now();

    a.setMinutes(0);
    a.setSeconds(0);

    seconds.value += Math.round((now() - a) / 1000);

    start();
  } else if (document.visibilityState === 'visible' && props.timelineItem.startedTrackingAt) {
    console.log('3333');

    const a = now();

    a.setMinutes(0);
    a.setSeconds(0);

    const diff = Math.round((a - pauseDate) / 1000);

    console.log('diff', diff);

    seconds.value += diff;

    // stop();
  } else if (isRunning.value) {
    // emit('a');

    pause();
  }


  // if (document.visibilityState === 'visible' && stopDate && isSameHour(stopDate)) {
  //   seconds.value += Math.round((now() - stopDate) / 1000);

  //   stopDate = null;

  //   start();
  // } else if (isRunning.value) {
  //   stopDate = now();

  //   stop();
  // }
}

document.addEventListener('visibilitychange', syncSeconds);

const emit = defineEmits(['toggle', 'updateSeconds']);

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

let stopwatch = null;

// if (props.isTracking && props.isCurrent) {
//   start();
// }

const time = computed(() => formatTime(seconds.value));
const isStartButtonEnabled = computed(() => props.timelineItem.hour === props.currentTime.getHours());

watch(() => props.isCurrent, () => {
  if (document.visibilityState === 'hidden') return;

  if (props.isCurrent && props.isTracking) {
    console.log('start');
    start();
  } else if (!props.isCurrent && isRunning.value) {
    console.log('stop');
    stop();
  }
  console.log('some');
}, {
  immediate: true
});

function start() {
  isRunning.value = true;

  stopwatch = setInterval(() => {
    emit('updateSeconds', 1);

    seconds.value++;
  }, 1000);

  emit('toggle', true);
}

function pause() {
  isRunning.value = false;

  clearInterval(stopwatch);

  pauseDate = now();
}

function stop() {
  isRunning.value = false;

  clearInterval(stopwatch);

  emit('toggle', false);
}

function reset() {
  stop();

  emit('updateSeconds', -seconds.value);

  seconds.value = 0;
}
</script>

<template>
  <div class="flex gap-2 w-full">
    <StopwatchButtonReset @click="reset" :disabled="!isRunning && !seconds" />
    <StopwatchTime>{{ time }}</StopwatchTime>
    <StopwatchButtonStop v-if="isRunning" @click="stop" />
    <StopwatchButtonStart v-else @click="start" :disabled="!isStartButtonEnabled" />
  </div>
</template>
