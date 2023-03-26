const periodsInMinutes = [
  0, 15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
];

export const periodSelectOptions = periodsInMinutes.map((periodInMinutes) => {
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
});
