<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import { formatTime } from '../functions';
import StopwatchButtonReset from './StopwatchButtonReset.vue';
import StopwatchButtonStart from './StopwatchButtonStart.vue';
import StopwatchButtonStop from './StopwatchButtonStop.vue';
import StopwatchTime from './StopwatchTime.vue';

const props = defineProps(['timelineItem', 'currentTime']);

const emit = defineEmits(['updateSeconds']);

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

let stopwatch = null;

const time = computed(() => formatTime(seconds.value));
const isTimeDisabled = computed(() => !props.timelineItem.activityId || props.timelineItem.hour > props.currentTime.getHours());
const isStartButtonEnabled = computed(() => props.timelineItem.activityId && props.timelineItem.hour === props.currentTime.getHours());

watch(props.timelineItem, () => {
  if (props.timelineItem.activityId === null) reset();
});

watchEffect(() => {
  // console.log(newTime, oldTime);

  if (props.isCurrent && props.timelineItem.activityId) {
    // console.log('aaaaaaaaaaaaaaaaaaa');
    start();
  } else {
    // console.log('bbbbbbbbbbbbbbbbbbb');
    stop();
  }
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
    <StopwatchButtonReset @click="reset" :disabled="!isRunning" />
    <StopwatchTime :class="{ 'opacity-50': isTimeDisabled }">{{ time }}</StopwatchTime>
    <StopwatchButtonStop v-if="isRunning" @click="stop" />
    <StopwatchButtonStart v-else @click="start" :disabled="!isStartButtonEnabled" />
  </div>
</template>
