<script setup>
import { ref, computed, watch } from 'vue';
import { formatTime } from '../functions';
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

const emit = defineEmits(['toggle', 'updateSeconds']);

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

let stopwatch = null;

if (props.isTracking && props.isCurrent) {
  start();
}

const time = computed(() => formatTime(seconds.value));
const isStartButtonEnabled = computed(() => props.timelineItem.hour === props.currentTime.getHours());

watch(() => props.isCurrent, () => {
  if (props.isCurrent && props.isTracking) {
    start();
  } else if (!props.isCurrent && isRunning.value) {
    stop();
  }
});

function start() {
  isRunning.value = true;

  stopwatch = setInterval(() => {
    emit('updateSeconds', 1);

    seconds.value++;
  }, 1000);

  emit('toggle', true);
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
