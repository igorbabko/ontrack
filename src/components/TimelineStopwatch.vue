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
});

let pauseDate = null;

function syncSeconds() {
  if (document.visibilityState === 'visible' && props.timelineItem.startedTrackingAt && props.isCurrent) {

    seconds.value += Math.round((now() - new Date(props.timelineItem.startedTrackingAt)) / 1000);

    console.log('1111', seconds.value);

    start();
  } else if (document.visibilityState === 'visible' && props.isCurrent && props.isTracking) {
    const a = now();

    a.setMinutes(0);
    a.setSeconds(0);

    seconds.value += Math.round((now() - a) / 1000);

    console.log('222222222222', seconds.value);

    start();
  } else if (document.visibilityState === 'visible' && props.timelineItem.startedTrackingAt) {
    const a = now();

    a.setMinutes(0);
    a.setSeconds(0);

    const diff = Math.round((a - pauseDate) / 1000);


    seconds.value += diff;

    console.log('diff', diff);
    console.log('3333', seconds.value);
  } else if (isRunning.value) {
    pause();
  }
}

document.addEventListener('visibilitychange', syncSeconds);

const emit = defineEmits(['toggle', 'updateSeconds']);

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

let stopwatch = null;

const time = computed(() => formatTime(seconds.value));
const isStartButtonEnabled = computed(() => props.timelineItem.hour === props.currentTime.getHours());

watch(() => props.isCurrent, () => {
  if (document.visibilityState === 'hidden') return;

  if (props.isCurrent && props.isTracking) {
    start();
  } else if (!props.isCurrent && isRunning.value) {
    stop();
  }
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
