import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';

export function loadState() {
  let state = localStorage.getItem('ontrack');

  state = state ? JSON.parse(state) : {};

  if (state.date !== (new Date).toLocaleDateString()) {
    return {
      timelineItems: generateTimelineItems(),
      activities: generateActivities(),
    };
  }

  const now = new Date;
  const start = state.timelineItems.findIndex(({ startedTrackingAt }) => startedTrackingAt);
  const end = state.timelineItems.findIndex(({ hour }) => hour === now.getHours());

  if (start === end) {
    const rackedTimelineItemSeconds = now - new Date(state.timelineItems[start].startedTrackingAt);

    console.log(state.timelineItems[start].startedTrackingAt);
    console.log('diff: ', rackedTimelineItemSeconds);
    console.log(': ', state.timelineItems[start].activitySeconds);

    state.timelineItems[start].activitySeconds += rackedTimelineItemSeconds / 1000;

    console.log(': ', state.timelineItems[start].activitySeconds);
  } else if (start + 1 === end) {
    const startOfCurrentHour = new Date();

    startOfCurrentHour.setMinutes(0)
    startOfCurrentHour.setSeconds(0);

    const firstTrackedTimelineItemSeconds = startOfCurrentHour - new Date(state.timelineItems[start].startedTrackingAt);
    const lastTrackedTimelineItemSeconds = new Date - startOfCurrentHour;

    state.timelineItems[start].activitySeconds += firstTrackedTimelineItemSeconds / 1000;
    state.timelineItems[end].activitySeconds = lastTrackedTimelineItemSeconds / 1000;
  } else {
    const startOfTrackedTimelineItemNextHour = new Date;

    startOfTrackedTimelineItemNextHour.setHours(state.timelineItems[start + 1].hour);
    startOfTrackedTimelineItemNextHour.setMinutes(0);
    startOfTrackedTimelineItemNextHour.setSeconds(0);

    const startOfTrackedTimelineItemCurrentHour = new Date;

    startOfTrackedTimelineItemCurrentHour.setHours(state.timelineItems[end].hour);
    startOfTrackedTimelineItemCurrentHour.setMinutes(0);
    startOfTrackedTimelineItemCurrentHour.setSeconds(0);

    const firstTrackedTimelineItemSeconds = startOfTrackedTimelineItemNextHour - new Date(state.timelineItems[start].startedTrackingAt);
    const lastTrackedTimelineItemSeconds = new Date - startOfTrackedTimelineItemCurrentHour;

    state.timelineItems[start].activitySeconds += firstTrackedTimelineItemSeconds / 1000;

    state.timelineItems.slice(start + 1, end - 1).forEach(timelineItem => {
      timelineItem.activitySeconds = 3600;
    });

    state.timelineItems[end].activitySeconds = lastTrackedTimelineItemSeconds / 1000;
  }

  return state;
}

export function generateTimelineItems() {
  const timelineItems = [];

  for (let hour = 0; hour < 24; hour++) {
    timelineItems.push({
      id: id(),
      hour,
      activityId: null,
      activitySeconds: 0,
      startedTrackingAt: null,
    });
  }

  return timelineItems;
}

export function generateActivities() {
  return [
    {
      id: id(),
      name: 'Coding',
      secondsToComplete: 0,
    },
    {
      id: id(),
      name: 'Training',
      secondsToComplete: 3600,
    },
    {
      id: id(),
      name: 'Reading',
      secondsToComplete: 120 * 60,
    },
  ];
}

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function filterTrackedActivities(activities) {
  return activities.filter(({ secondsToComplete }) => secondsToComplete);
}

export function getTotalActivitySeconds(activity, timelineItems) {
  return timelineItems
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce((totalSeconds, timelineItem) => Math.round((timelineItem.activitySeconds/* / 60 */) + totalSeconds), 0);
}

export function getProgressColorClass(percentage) {
  if (percentage < 33) return 'bg-red-500';
  if (percentage < 66) return 'bg-yellow-500';
  if (percentage < 100) return 'bg-blue-500';

  return 'bg-green-500';
}

export function normalizePercentage(percentage) {
  percentage = Math.floor(percentage);

  return percentage < 100 ? percentage : 100;
}

export function formatTime(seconds) {
  const date = new Date;

  date.setTime(Math.abs(seconds) * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function getCurrentPage() {
  const hash = window.location.hash.slice(1);

  return [PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash) ? hash : PAGE_TIMELINE;
}

export function generateActivitySelectOptions(activities) {
  return activities.map(activity => ({ value: activity.id, label: activity.name }));
}

export function generatePeriodSelectOptions() {
  const periodsInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
  ];

  return periodsInMinutes.map(periodInMinutes => ({
    value: periodInMinutes * 60,
    label: generatePeriodSelectOptionLabel(periodInMinutes),
  }));
}

function generatePeriodSelectOptionLabel(periodInMinutes) {
  const hours = Math.floor(periodInMinutes / 60);
  const minutes = periodInMinutes % 60;

  if (hours && minutes) {
    return `${hours}:${minutes}`;
  }

  if (hours) {
    return `${hours}:00`;
  }

  return `0:${minutes.toString().padStart(2, 0)}`;
}
