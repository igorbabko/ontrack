<script setup>
import { ref, watch } from 'vue';
import { id, activities as activityItems, goals as goalItems, timelineItems as timelineActivityItems } from './db';
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'
import TheGoals from './components/TheGoals.vue'

const activities = ref(activityItems);
const goals = ref(goalItems);
const timelineItems = ref(timelineActivityItems);

const page = ref(window.location.hash.slice(1) || 'timeline');

function changeActivityForHour(hour, activity) {
  timeline[hour].value.activityId = activity.id;
}

function addActivity(name) {
  activities.value[id()] = name;
}

function deleteActivity({ id }) {
  delete activities.value[id];
}

watch(() => activities.value.length, () => {
  window.scrollTo(0, document.body.scrollHeight);
}, { flush: 'post' });

function go(to) {
  page.value = to;
}
</script>

<template>
  <TheHeader @home="go('timeline')" />

  <main class="flex-grow">
    <TheTimeline
      v-show="page === 'timeline'"
      :timeline-items="timelineItems"
      :activities="activities"
      @change-activity="changeActivityForHour" />
    <TheActivities
      v-show="page === 'activities'"
      :activities="activities"
      :goals="goals"
      @add="addActivity"
      @delete="deleteActivity" />
    <TheGoals
      v-show="page === 'stats'"
      :timeline-items="timelineItems"
      :activities="activities"
      :goals="goals" />
  </main>

  <TheNav @go="go($event)" />
</template>
