<script setup>
// import TheWelcome from './components/TheWelcome.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'
import TheStats from './components/TheStats.vue'
import TheGoals from './components/TheGoals.vue'

import { ref, shallowRef, watch } from 'vue';

const view = shallowRef('timeline');

const timeRanges = [
  {
    id: '00',
    activity: 'Coding',
    time: 100
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

const activities = ref([
  {
    name: 'Coding',
    time: {
      start: new Date(),
      end: new Date()
    }
  },
  {
    name: 'Training',
    time: {
      start: new Date(),
      end: new Date()
    }
  },
  {
    name: 'Reading',
    time: {
      start: new Date(),
      end: new Date()
    }
  }
]);

function addActivity(name) {
  activities.value.push({
    name,
    time: {
      start: new Date(),
      end: new Date(),
    }
  });
}

watch(() => activities.value.length, () => {
  window.scrollTo(0, document.body.scrollHeight);
}, { flush: 'post' });
</script>

<template>
  <!-- <ul> -->
  <!-- <li v-for="activity in activities">{{ activity.name }}</li> -->
  <!-- </ul> -->


  <div class="flex-grow">
    <TheTimeline v-show="view === 'timeline'" :time-ranges="timeRanges" :activities="activities" />
    <TheActivities v-show="view === 'activities'" :activities="activities" @add="addActivity" />
    <TheStats v-show="view === 'stats'" />
    <TheGoals v-show="view === 'goals'" />
  </div>

  <TheNav @go="view = $event" />
</template>
