<script setup>
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'
import TheStats from './components/TheStats.vue'

import { ref, watch } from 'vue';

const view = ref(window.location.hash.slice(1) || 'timeline');

const hours = [
  {
    id: '00',
    activity: 'Coding',
    time: 4100
  },
  {
    id: '01',
    activity: 'Rest',
    time: 200
  },
  {
    id: '02',
    activity: 'Reading',
    time: 0
  },
  {
    id: '03',
    activity: 'Coding',
    time: 400
  },
  {
    id: '04',
    activity: 'Training',
    time: 500
  },
  {
    id: '05',
    activity: 'Reading',
    time: 0
  },
];

const goals = {
  Coding: 60,
  Training: 120,
  // reading: 45
};

const activities = ref([
  {
    name: 'Coding',
  },
  {
    name: 'Training',
  },
  {
    name: 'Reading',
  }
]);

function addActivity(name) {
  activities.value.push({ name });
}

watch(() => activities.value.length, () => {
  window.scrollTo(0, document.body.scrollHeight);
}, { flush: 'post' });
</script>

<template>
  <div class="flex-grow">
    <TheTimeline v-show="view === 'timeline'" :hours="hours" :activities="activities" />
    <TheActivities v-show="view === 'activities'" :activities="activities" :goals="goals" @add="addActivity" />
    <TheStats v-show="view === 'stats'" :activities="activities" :hours="hours" :goals="goals" />
  </div>

  <TheNav @go="view = $event" />
</template>
