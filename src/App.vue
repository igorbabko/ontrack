<script setup>
import { ref, computed } from 'vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
import { id, generateTimelineItems, generateActivities, generateActivitySelectOptions } from './functions';
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './components/TheTimeline.vue'
import TheActivities from './components/TheActivities.vue'
import TheProgress from './components/TheProgress.vue'

const currentPage = ref([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : PAGE_TIMELINE);
const timelineItems = ref(generateTimelineItems());
const activities = ref(generateActivities());
const timeline = ref();

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function setTimelineItemActivity({ timelineItem, activityId }) {
  timelineItem.activityId = activityId;
}

function updateTimelineItemActivitySeconds({ timelineItem, activitySeconds }) {
  console.log('aaaa', { timelineItem, activitySeconds });

  timelineItem.activitySeconds += activitySeconds;
}

function createActivity(name) {
  activities.value.push({
    id: id(),
    name,
    secondsToComplete: 0
  });
}

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });

  const activityIndex = activities.value.findIndex(({ id }) => id === activity.id);

  activities.value.splice(activityIndex, 1);
}

function setActivitySecondsToComplete({ activity, secondsToComplete }) {
  console.log('bbb', { activity, secondsToComplete });

  activity.secondsToComplete = secondsToComplete;
}

function goTo(page) {
  currentPage.value = page;
}

function goToTimeline() {
  if (currentPage.value === PAGE_TIMELINE) {
    timeline.value.scrollToCurrentTimelineItem();
  } else {
    goTo(PAGE_TIMELINE);
  }
}
</script>

<template>
  <TheHeader
    :timeline-items="timelineItems"
    :activities="activities"
    @go-to-timeline="goToTimeline"
    @go-to-progress="goTo(PAGE_PROGRESS)" />

  <main class="flex flex-col flex-grow">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
      :current-page="currentPage"
      ref="timeline"
      @set-timeline-item-activity="setTimelineItemActivity"
      @update-timeline-item-activity-seconds="updateTimelineItemActivitySeconds" />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :timeline-items="timelineItems"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete" />
    <TheProgress
      v-show="currentPage === PAGE_PROGRESS"
      :timeline-items="timelineItems"
      :activities="activities"
      @go-to-activities="goTo(PAGE_ACTIVITIES)"
       />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
