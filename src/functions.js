export const id = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export function getTotalActivitySeconds(activity, timelineItems) {
  return timelineItems
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce((totalSeconds, timelineItem) => Math.round((timelineItem.activitySeconds/* / 60 */) + totalSeconds), 0);
}

export function formatTime(seconds) {
  const now = new Date;

  now.setTime(Math.abs(seconds) * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function generatePeriodSelectOption(periodInMinutes) {
  const hours = Math.floor(periodInMinutes / 60);
  const minutes = periodInMinutes % 60;

  let label = '';

  if (hours && minutes) {
    label = `${hours}:${minutes} hr`;
  } else if (hours) {
    label = `${hours}:00 hr`;
  } else {
    label = `0:${minutes.toString().padStart(2, 0)} hr`;
  }

  return {
    value: periodInMinutes,
    label
  };
}
