import { APP_NAME } from './constants';

let state = null;

export function loadState() {
  state = loadFromLocalStorage();

  if (!isTodaysState()) {
    return defaultState();
  }

  if (shouldSyncTime()) {
    syncTime();
  }

  return state;
}

function loadFromLocalStorage() {
  const rawState = localStorage.getItem(APP_NAME);

  return rawState ? JSON.parse(rawState) : {};
}

function isTodaysState() {
  return state.date === now().toLocaleDateString();
}

function defaultState() {
  return {
    timelineItems: generateTimelineItems(),
    activities: generateActivities(),
  };
}

function shouldSyncTime() {
  return state.timelineItems.some(({ startedTrackingAt }) => startedTrackingAt);
}

function syncTime() {
  const firstTracked = getFirstTracked();
  const firstTrackedIndex = state.timelineItems.indexOf(firstTracked);

  const lastTracked = getLastTracked();
  const lastTrackedIndex = state.timelineItems.indexOf(lastTrackedIndex);

  if (firstTrackedIndex === lastTrackedIndex) {
    // console.log(firstTrackedTimelineItem.startedTrackingAt);
    // console.log('diff: ', trackedTimelineItemSeconds);
    // console.log(': ', trackedTimelineItem.activitySeconds);

    updateTrackedActivitySeconds(firstTracked, now - new Date(firstTracked.startedTrackingAt));

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

    updateTrackedActivitySecondsWithinRange(firstTrackedIndex + 1, lastTrackedIndex - 1);

    updateTrackedActivitySeconds(lastTracked, trackedSeconds.last);
  }

  return state;
}

function getFirstTracked() {
  return state.timelineItems.find(({ startedTrackingAt }) => startedTrackingAt);
}

function getLastTracked() {
  const currentDate = now();

  // now.setHours(13);

  return state.timelineItems.find(({ hour }) => hour === currentDate.getHours());
}

function updateTrackedActivitySecondsWithinRange(start, end) {
  state.timelineItems
    .slice(start, end)
    .forEach(timelineItem => updateTrackedActivitySeconds(timelineItem, 3_600_000));
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
