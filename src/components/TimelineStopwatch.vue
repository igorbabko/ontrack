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

const shouldShowTime = computed(() => seconds.value || isRunning.value);

function start() {
  isRunning.value = true;

  stopwatch = setInterval(() => {
    emit('updateSeconds', 1);

    seconds.value++;
  }, 1000);
}

function pause() {
  isRunning.value = false;

  clearInterval(stopwatch);
}

function reset() {
  emit('updateSeconds', -seconds.value);

  seconds.value = 0;
}
</script>

<template>
  <template v-if="shouldShowTime">
    <StopwatchButtonReset v-if="forCurrentHour" @click="reset" />
    <StopwatchTime :seconds="seconds" />
  </template>
  <StopwatchButtonStop v-if="isRunning" @click="pause" />
  <StopwatchButtonStart v-else-if="forCurrentHour" @click="start" />
</template>
