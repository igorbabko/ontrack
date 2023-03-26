import { id, generatePeriodSelectOptions } from './functions';

const periodsInMinutes = [
  15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
];

export const periodSelectOptions = generatePeriodSelectOptions(periodsInMinutes);

export const activities = [
  {
    id: id(),
    name: 'Coding',
    secondsToComplete: 0,
  },
  {
    id: id(),
    name: 'Training',
    secondsToComplete: 60,
  },
  {
    id: id(),
    name: 'Reading',
    secondsToComplete: 120,
  },
];

export const timelineItems = [];

for (let hour = 1; hour < 24; hour++) {
  timelineItems.push({
    id: id(),
    hour,
    activityId: null,
    activitySeconds: 0,
  });
}
