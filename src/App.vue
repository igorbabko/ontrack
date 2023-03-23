<script setup>
import { ref, watch } from 'vue';
import { activities as activityItems, goals as goalItems, timelineActivities as timelineActivityItems } from './db';
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'
import TheStats from './components/TheStats.vue'

const activities = ref(activityItems);
const goals = ref(goalItems);
const timelineActivities = ref(timelineActivityItems);

const view = ref(window.location.hash.slice(1) || 'timeline');

function changeActivityForHour(hour, activity) {
  timeline[hour].value.activityId = activity.id;
}

function addActivity(name) {
  activities.value.push({ name });
}

watch(() => activities.value.length, () => {
  window.scrollTo(0, document.body.scrollHeight);
}, { flush: 'post' });
</script>

<template>
  <div class="flex-grow">
    <TheTimeline
      v-show="view === 'timeline'"
      :timeline-activities="timelineActivities"
      :activities="activities"
      @change-activity="changeActivityForHour" />
    <TheActivities
      v-show="view === 'activities'"
      :activities="activities"
      :goals="goals"
      @add="addActivity" />
    <TheStats
      v-show="view === 'stats'"
      :activities="activities"
      :timeline-activities="timelineActivities"
      :goals="goals" />
  </div>

  <TheNav @go="view = $event" />
</template>
