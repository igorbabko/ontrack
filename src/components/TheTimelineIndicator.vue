<script setup>
import { ref, watchPostEffect, onMounted, nextTick } from 'vue';

const props = defineProps(['currentPage']);

const el = ref();

onMounted(() => {
  updateHeight();

  setInterval(updateHeight, 60 * 1000);
});

watchPostEffect(async () => {
  if (props.currentPage === 'timeline') {
    await nextTick();

    updateHeight();
  }
});

function updateHeight() {
  el.value.style.height = `${height()}px`;
}

function height() {
  const secondsPercentage = 100 * seconds() / 86400;

  return secondsPercentage * el.value.parentNode.getBoundingClientRect().height / 100;
}

function seconds() {
  const now = new Date();

  return now.getSeconds() + (60 * now.getMinutes()) + (60 * 60 * now.getHours());
}
</script>

<template>
  <div ref="el" class="absolute border-b-2 border-red-600 w-full pointer-events-none z-10"></div>
</template>
