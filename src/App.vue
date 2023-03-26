<script setup>
import { ref } from 'vue';
import { id, activities as activitiesData, timelineItems as timelineItemsData } from './db';
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'

const activities = ref(activitiesData);
const timelineItems = ref(timelineItemsData);

const currentPage = ref(window.location.hash.slice(1) || 'timeline');

function selectTimelineItemActivity({ timelineItemId, activityId }) {
  timelineItems.value[timelineItemId] = { activityId, seconds: 0 };
}

function createActivity(name) {
  activities.value[id()] = { name, secondsToComplete: 0 };
}

function deleteActivity({ id }) {
  delete activities.value[id];
}

function setActivitySecondsToComplete({ activityId, secondsToComplete }) {
  console.log({ activityId, secondsToComplete });

  activities.value[activityId].secondsToComplete = secondsToComplete;
}

function updateTimelineItemSeconds({ timelineItemId, seconds }) {
  console.log({ timelineItemId, seconds });

  timelineItems.value[timelineItemId].time += seconds;
}

function goTo(page) {
  currentPage.value = page;
}
</script>

<template>
  <TheHeader
    :timeline-items="timelineItems"
    :activities="activities"
    @go-to-timeline="go('timeline')" />

  <main class="flex flex-col flex-grow">
    <TheTimeline
      v-show="currentPage === 'timeline'"
      :timeline-items="timelineItems"
      :activities="activities"
      :current-page="currentPage"
      @select-timeline-item-activity="selectTimelineItemActivity"
      @update-timeline-item-seconds="updateTimelineItemSeconds" />
    <TheActivities
      v-show="currentPage === 'activities'"
      :timeline-items="timelineItems"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
