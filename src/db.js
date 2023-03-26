export const id = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

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
