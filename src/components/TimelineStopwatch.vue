<script setup>
import { ref, computed } from 'vue';
import StopwatchButtonReset from './StopwatchButtonReset.vue';
import StopwatchButtonStart from './StopwatchButtonStart.vue';
import StopwatchButtonStop from './StopwatchButtonStop.vue';
import StopwatchTime from './StopwatchTime.vue';

const props = defineProps({
  forCurrentHour: Boolean,
  seconds: Number,
});

const emit = defineEmits(['updateSeconds']);

const isRunning = ref(false);
const seconds = ref(props.seconds);

let stopwatch = null;

function start() {
  isRunning.value = true;

  stopwatch = setInterval(() => {
    emit('updateSeconds', 1);

    seconds.value++;
  }, 1000);
}

function stop() {
  isRunning.value = false;

  clearInterval(stopwatch);
}

function reset() {
  stop();

  emit('updateSeconds', -seconds.value);

  seconds.value = 0;
}
</script>

<template>
  <div class="flex gap-1 w-full">
    <StopwatchButtonReset v-if="forCurrentHour" @click="reset" />
    <StopwatchTime :seconds="seconds" />
    <StopwatchButtonStop v-if="isRunning" @click="stop" />
    <StopwatchButtonStart v-else-if="forCurrentHour" @click="start" />
  </div>
</template>
