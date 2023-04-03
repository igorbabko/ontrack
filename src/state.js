import { APP_NAME } from './constants';
import { now } from './functions';

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

export function saveState(timelineItems, activities) {
  const trackedTimelineItem = timelineItems.find(({ startedTrackingAt }) => startedTrackingAt);

  if (trackedTimelineItem) {
    trackedTimelineItem.startedTrackingAt = now();
  }

  localStorage.setItem(APP_NAME, JSON.stringify({
    date: now().toLocaleDateString(),
    timelineItems,
    activities
  }));
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
  const firstTracked = getFirstTrackedTimelineItem();
  const firstTrackedIndex = state.timelineItems.indexOf(firstTracked);

  const lastTracked = getLastTrackedTimelineItem();
  const lastTrackedIndex = state.timelineItems.indexOf(lastTracked);

  if (firstTrackedIndex === lastTrackedIndex) {
    // console.log(firstTrackedTimelineItem.startedTrackingAt);
    // console.log('diff: ', trackedTimelineItemSeconds);
    // console.log(': ', trackedTimelineItem.activitySeconds);
    //

    const seconds = (now() - new Date(firstTracked.startedTrackingAt)) / 1000;

    updateTimelineItemActivitySeconds(firstTracked, seconds);

    // console.log(': ', firstTrackedTimelineItem.activitySeconds);
  } else if (firstTrackedIndex + 1 === lastTrackedIndex) {
    const trackedStartDate = getTimelineItemStartDate(firstTracked);

    const trackedSeconds = getFirstAndLastTrackedTimelineItemSeconds(
      trackedStartDate,
      trackedStartDate,
      firstTracked
    );

    debugger;

    updateTimelineItemActivitySeconds(firstTracked, trackedSeconds.first);
    updateTimelineItemActivitySeconds(lastTracked, trackedSeconds.last);
  } else {
    const nextTracked = state.timelineItems[firstTrackedIndex + 1];

    const trackedSeconds = getFirstAndLastTrackedTimelineItemSeconds(
      getTimelineItemStartDate(nextTracked),
      getTimelineItemStartDate(lastTracked),
      firstTracked
    );

    updateTimelineItemActivitySeconds(firstTracked, trackedSeconds.first);

    updateTrackedTimelineItemActivitySecondsWithinRange(firstTrackedIndex + 1, lastTrackedIndex - 1);

    updateTimelineItemActivitySeconds(lastTracked, trackedSeconds.last);
  }

  return state;
}

function getFirstTrackedTimelineItem() {
  return state.timelineItems.find(({ startedTrackingAt }) => startedTrackingAt);
}

function getLastTrackedTimelineItem() {
  const currentDate = now();

  return state.timelineItems.find(({ hour }) => hour === currentDate.getHours());
}

function updateTrackedTimelineItemActivitySecondsWithinRange(start, end) {
  console.log(start, end + 1);

  state.timelineItems
    .slice(start, end + 1)
    .forEach(timelineItem => updateTimelineItemActivitySeconds(timelineItem, 3_600_000));
}

function updateTimelineItemActivitySeconds(timelineItem, seconds) {
  timelineItem.activitySeconds += seconds;
}

function getFirstAndLastTrackedTimelineItemSeconds(nextTrackedStartDate, lastTrackedStartDate, firstTracked) {
  return {
    first: (nextTrackedStartDate - new Date(firstTracked.startedTrackingAt)) / 1000,
    last: (now() - lastTrackedStartDate) / 1000,
  };
}

function getTimelineItemStartDate(timelineItem) {
  const date = now();

  date.setHours(timelineItem.hour);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
}
