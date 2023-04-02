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
  isCurrent: Boolean
});

const emit = defineEmits(['updateSeconds']);

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

let stopwatch = null;

const time = computed(() => formatTime(seconds.value));
const isStartButtonEnabled = computed(() => props.timelineItem.activityId && props.timelineItem.hour === props.currentTime.getHours());

watch(props.timelineItem, () => {
  if (props.timelineItem.activityId === null) reset();
});

watch(() => props.isCurrent, () => props.isCurrent && props.timelineItem.activityId ? start() : stop());
// console.log(newTime, oldTime);

// console.log('aaaaaaaaaaaaaaaaaaa');
// start();
// } else {
// console.log('bbbbbbbbbbbbbbbbbbb');
// stop();
// }

function start() {
  isRunning.value = true;

  stopwatch = new Worker(new URL('../stopwatch.js', import.meta.url));

  stopwatch.onmessage = () => {
    emit('updateSeconds', 1);

    seconds.value++;
  };
}

function stop() {
  isRunning.value = false;

  stopwatch.terminate();
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
