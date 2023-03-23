<script setup>
import { ref, onMounted } from 'vue';
import TimelineItem from './TimelineItem.vue';

defineProps(['timeRanges', 'activities'])

const r = ref();
const a = ref();
const height = ref();

function b() {
  const dt = new Date();

  var secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());

  console.log(secs);

  const timePercent = 100 * secs / 86400;

  height.value = timePercent * r.value.getBoundingClientRect().height / 100;

  console.log(height.value);

  a.value.style.height = height.value + 'px';
}

onMounted(() => {
  b();

  setInterval(b, 60 * 1000);
});
</script>

<template>
  <div class="relative" ref="r">
    <div class="absolute bg-purple-200 w-full" ref="a"></div>
    <ul class="relative z-10 divide-y">
      <TimelineItem v-for="hour in timeRanges" :hour="hour" :activities="activities" />
    </ul>
  </div>
</template>
