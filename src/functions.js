import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';

export function now() {
  return new Date;
}

export function loadState() {
  let state = localStorage.getItem('ontrack');

  state = state ? JSON.parse(state) : {};

  if (state.date !== now().toLocaleDateString()) {
    return {
      timelineItems: generateTimelineItems(),
      activities: generateActivities(),
    };
  }

  const currentDate = now();

  // now.setHours(13);

  const firstTrackedIndex = state.timelineItems.findIndex(({ startedTrackingAt }) => startedTrackingAt);
  const firstTracked = state.timelineItems[firstTrackedIndex];

  const lastTrackedIndex = state.timelineItems.findIndex(({ hour }) => hour === currentDate.getHours());
  const lastTracked = state.timelineItems[lastTrackedIndex];

  if (firstTrackedIndex === lastTrackedIndex) {
    const trackedSeconds = now - new Date(firstTracked.startedTrackingAt);

    // console.log(firstTrackedTimelineItem.startedTrackingAt);
    // console.log('diff: ', trackedTimelineItemSeconds);
    // console.log(': ', trackedTimelineItem.activitySeconds);

    updateTrackedActivitySeconds(firstTracked, trackedSeconds);

    // console.log(': ', firstTrackedTimelineItem.activitySeconds);
  } else if (firstTrackedIndex + 1 === lastTrackedIndex) {
    const trackedStartDate = getTimelineItemStartDate(firstTracked);

    const trackedSeconds = getFirstAndLastTrackedSeconds(trackedStartDate, trackedStartDate, firstTracked);

    updateTrackedActivitySeconds(firstTracked, trackedSeconds.first);
    updateTrackedActivitySeconds(lastTracked, trackedSeconds.last);
  } else {
    const nextTracked = state.timelineItems[firstTrackedIndex + 1];

    const trackedSeconds = getFirstAndLastTrackedSeconds(
      getTimelineItemStartDate(nextTracked),
      getTimelineItemStartDate(lastTracked),
      firstTracked
    );

    updateTrackedActivitySeconds(firstTracked, trackedSeconds.first);

    state.timelineItems
      .slice(firstTrackedIndex + 1, lastTrackedIndex - 1)
      .forEach(timelineItem => updateTrackedActivitySeconds(timelineItem, 3_600_000));

    updateTrackedActivitySeconds(lastTracked, trackedSeconds.last);
  }

  return state;
}

function updateTrackedActivitySeconds(tracked, milliseconds) {
  tracked.activitySeconds += milliseconds / 1000;
}

function getFirstAndLastTrackedSeconds(nextTrackedStartDate, lastTrackedStartDate, firstTracked) {
  return {
    first: nextTrackedStartDate - new Date(firstTracked.startedTrackingAt),
    last: now() - lastTrackedStartDate,
  };
}

function getTimelineItemStartDate(timelineItem) {
  const date = now();

  date.setHours(timelineItem.hour);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
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
  const date = now();

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
