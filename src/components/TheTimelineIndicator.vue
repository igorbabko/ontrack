<script setup>
import { ref, watchPostEffect, onMounted, nextTick } from 'vue';
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT,
  PAGE_TIMELINE
} from '../constants';
import { now } from '../functions';

const props = defineProps(['currentPage']);

const el = ref();

onMounted(() => {
  updateHeight();

  setInterval(updateHeight, MILLISECONDS_IN_SECOND);
});

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();

    updateHeight();
  }
});

function updateHeight() {
  el.value.style.top = `${topOffset()}px`;
}

function topOffset() {
  const secondsPercentage = HUNDRED_PERCENT * seconds() / SECONDS_IN_DAY;

  return secondsPercentage * el.value.parentNode.getBoundingClientRect().height / HUNDRED_PERCENT;
}

function seconds() {
  const date = now();

  return date.getSeconds() + (SECONDS_IN_MINUTE * date.getMinutes()) + (SECONDS_IN_MINUTE * MINUTES_IN_HOUR * date.getHours());
}
</script>

<template>
  <hr ref="el" class="absolute border-b-2 border-red-600 w-full z-10 opacity-50 pointer-events-none">
</template>
