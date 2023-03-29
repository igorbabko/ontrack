<script setup>
import { ref, computed, watch } from 'vue';
import StopwatchButtonReset from './StopwatchButtonReset.vue';
import StopwatchButtonStart from './StopwatchButtonStart.vue';
import StopwatchButtonStop from './StopwatchButtonStop.vue';
import StopwatchTime from './StopwatchTime.vue';

const props = defineProps(['timelineItem']);

const emit = defineEmits(['updateSeconds']);

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

let stopwatch = null;

const disabled = computed(() => !props.timelineItem.activityId || props.timelineItem.hour > (new Date).getHours());

watch(props.timelineItem, () => {
  if (props.timelineItem.activityId === null) reset();
});

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
  <div class="flex gap-2 w-full">
    <StopwatchButtonReset @click="reset" :disabled="disabled" />
    <StopwatchTime :seconds="seconds" :disabled="disabled" />
    <StopwatchButtonStop v-if="isRunning" @click="stop" :disabled="disabled" />
    <StopwatchButtonStart v-else @click="start" :disabled="disabled" />
  </div>
</template>
