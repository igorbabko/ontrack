<script setup>
import TimelineItem from './TimelineItem.vue';
import { ref, computed, onMounted } from 'vue';

defineProps(['timeRanges', 'activities'])

const r = ref();
const a = ref();
const height = ref();

// const offset = computed(() => {

// });

onMounted(() => {
  // console.log(r.value.getBoundingClientRect().height);

  setInterval(() => {
    const dt = new Date();

    var secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());

    console.log(secs);

    const timePercent = 100 * secs / 86400;

    height.value = timePercent * r.value.getBoundingClientRect().height / 100;

    console.log(height.value);

    a.value.style.height = height.value + 'px';
  }, 1000);
});
</script>

<template>
  <div class="relative" ref="r">
    <!-- <hr class="h-2 bg-purple-900 opacity-70"> -->
    <div class="absolute h-24 bg-purple-600 w-full" ref="a">asdf</div>
    <ul class="relative z-10">
      <TimelineItem v-for="hour in timeRanges" :hour="hour" :activities="activities" />
    </ul>
  </div>
</template>
