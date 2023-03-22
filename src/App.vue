<script setup>
// import TheWelcome from './components/TheWelcome.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'
import TheGoals from './components/TheGoals.vue'

import { ref, shallowRef, watch } from 'vue';

const view = shallowRef('timeline');

const timeRanges = [
  {
    id: 0,
    activity: 'Coding'
  },
  {
    id: 1,
    activity: 'Training'
  },
  {
    id: 2,
    activity: 'Reading'
  },
  {
    id: 3,
    activity: 'Coding'
  },
  {
    id: 4,
    activity: 'Training'
  },
  {
    id: 5,
    activity: 'Reading'
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
  console.log('aaaaaaaa');

  window.scrollTo(0, document.body.scrollHeight);
}, { flush: 'post' });
</script>

<template>
  <!-- <ul> -->
  <!-- <li v-for="activity in activities">{{ activity.name }}</li> -->
  <!-- </ul> -->

  <TheTimeline v-if="view === 'timeline'" :time-ranges="timeRanges" :activities="activities" />
  <TheActivities v-else-if="view === 'activities'" :activities="activities" @add="addActivity" />
  <TheGoals v-else-if="view === 'goals'" />

  <TheNav @go="view = $event" />
</template>
