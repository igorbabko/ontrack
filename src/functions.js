import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  SECONDS_IN_HOUR,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  HUNDRED_PERCENT,
  MEDIUM_PERCENT,
  LOW_PERCENT,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE
} from './constants';

export function now() {
  const now = new Date;

  // now.setDate(8);
  now.setHours(16);
  // now.setMinutes(now.getMinutes() - 20);
  // now.setSeconds(now.getSeconds() + 10);

  return now;
}

export function currentHourStartDate() {
  const date = now();

  date.setMinutes(0);
  date.setSeconds(0);

  return date;
}

export function millisecondsToSeconds(ms) {
  return Math.round(ms / MILLISECONDS_IN_SECOND);
}

export function generateTimelineItems() {
  const timelineItems = [];

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
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
      secondsToComplete: SECONDS_IN_HOUR,
    },
    {
      id: id(),
      name: 'Reading',
      secondsToComplete: 120 * SECONDS_IN_MINUTE,
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
    .reduce((totalSeconds, timelineItem) => Math.round((timelineItem.activitySeconds) + totalSeconds), 0);
}

export function getProgressColorClass(percentage) {
  if (percentage < LOW_PERCENT) return 'bg-red-500';
  if (percentage < MEDIUM_PERCENT) return 'bg-yellow-500';
  if (percentage < HUNDRED_PERCENT) return 'bg-blue-500';

  return 'bg-green-500';
}

export function normalizePercentage(percentage) {
  percentage = Math.floor(percentage);

  return percentage < HUNDRED_PERCENT ? percentage : HUNDRED_PERCENT;
}

export function formatTime(seconds) {
  const date = now();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

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
    value: periodInMinutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionLabel(periodInMinutes),
  }));
}

function generatePeriodSelectOptionLabel(periodInMinutes) {
  const hours = Math.floor(periodInMinutes / MINUTES_IN_HOUR);
  const minutes = periodInMinutes % MINUTES_IN_HOUR;

  if (hours && minutes) {
    return `${hours}:${minutes}`;
  }

  if (hours) {
    return `${hours}:00`;
  }

  return `0:${minutes.toString().padStart(2, 0)}`;
}
