<script setup>
import { ref, onMounted } from 'vue';
import TimelineActivity from './TimelineActivity.vue';

defineProps(['timelineActivities', 'activities'])

const r = ref();
const a = ref();
const height = ref();

function b() {
  const dt = new Date();

  var secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());

  const timePercent = 100 * secs / 86400;

  height.value = timePercent * r.value.getBoundingClientRect().height / 100;

  a.value.style.height = height.value + 'px';
}

onMounted(() => {
  b();

  setInterval(b, 60 * 1000);
});
</script>

<template>
  <div class="relative" ref="r">
    <div class="absolute bg-slate-100 border-b-2 border-red-600 w-full" ref="a"></div>
    <ul class="relative z-10 divide-y">
      <TimelineActivity
        v-for="timelineActivity, hour in timelineActivities"
        :hour="hour"
        :timeline-activity="timelineActivity"
        :activities="activities"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
