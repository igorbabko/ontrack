<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const el = ref();

onMounted(() => {
  updateHeight();

  setInterval(updateHeight, 60 * 1000);
});

onUpdated(updateHeight);

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
  <div ref="el" class="absolute bg-slate-100/70 border-b-2 border-red-600 w-full"></div>
</template>
