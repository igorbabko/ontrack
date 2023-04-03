<script setup>
import { ref, watchPostEffect, onMounted, nextTick } from 'vue';
import { PAGE_TIMELINE } from '../constants';
import { now } from '../functions';

const props = defineProps(['currentPage']);

const el = ref();

onMounted(() => {
  updateHeight();

  setInterval(updateHeight, 60 * 1000);
});

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();

    updateHeight();
  }
});

function updateHeight() {
  el.value.style.top = `${height()}px`;
}

function height() {
  const secondsPercentage = 100 * seconds() / 86400;

  return secondsPercentage * el.value.parentNode.getBoundingClientRect().height / 100;
}

function seconds() {
  const currentDate = now();

  return currentDate.getSeconds() + (60 * currentDate.getMinutes()) + (60 * 60 * currentDate.getHours());
}
</script>

<template>
  <hr ref="el" class="absolute border-b-2 border-red-600 w-full z-10 opacity-50">
</template>
