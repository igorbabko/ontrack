export const id = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export function getCurrentHour() {
  return (new Date).getHours();
}

export function getTotalActivitySeconds(activity, timelineItems) {
  return timelineItems
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce((totalSeconds, timelineItem) => Math.round((timelineItem.activitySeconds/* / 60 */) + totalSeconds), 0);
}

export function formatTime(seconds) {
  const date = new Date;

  date.setTime(Math.abs(seconds) * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function generateActivitySelectOptions(activities) {
  return activities.map(activity => ({ value: activity.id, label: activity.name }));
}

export function generatePeriodSelectOptions(periodsInMinutes) {
  return periodsInMinutes.map(periodInMinutes => {
    const hours = Math.floor(periodInMinutes / 60);
    const minutes = periodInMinutes % 60;

    let label = '';

    if (hours && minutes) {
      label = `${hours}:${minutes}`;
    } else if (hours) {
      label = `${hours}:00`;
    } else {
      label = `0:${minutes.toString().padStart(2, 0)}`;
    }

    return {
      value: periodInMinutes,
      label
    };
  });
}
