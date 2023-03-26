export const id = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

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
