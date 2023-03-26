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
  const timelineItem = timelineItems.value.find(({ id }) => id === timelineItemId);

  timelineItem.activityId = activityId;
  timelineItem.activitySeconds = 0;
}

function createActivity(name) {
  activities.value.push({
    id: id(),
    name,
    secondsToComplete: 0
  });
}

function deleteActivity(activity) {
  const activityIndex = activities.value.findIndex(({ id }) => id === activity.id);

  activities.value.splice(activityIndex, 1);
}

function setActivitySecondsToComplete({ activity: { id: activityId }, secondsToComplete }) {
  console.log({ activityId, secondsToComplete });

  const activity = activities.value.find(({ id }) => id === activityId);

  activity.secondsToComplete = secondsToComplete;
}

function updateTimelineItemActivitySeconds({ timelineItemId, activitySeconds }) {
  console.log({ timelineItemId, activitySeconds });

  const timelineItem = timelineItems.value.find(({ id }) => id === timelineItemId);

  timelineItem.activitySeconds += activitySeconds;
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
      @update-timeline-item-activity-seconds="updateTimelineItemActivitySeconds" />
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
