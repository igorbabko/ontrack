export const id = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const codingId = id();
const trainingId = id();
const readingId = id();

export const activities = {
  [codingId]: {
    name: 'Coding',
    secondsToComplete: 0,
  },
  [trainingId]: {
    name: 'Training',
    secondsToComplete: 60,
  },
  [readingId]: {
    name: 'Reading',
    secondsToComplete: 120,
  },
};

export const timelineItems = [];

for (let hour = 1; hour < 24; hour++) {
  timelineItems.push({
    id: id(),
    hour,
    activityId: null,
    activitySeconds: 0,
  });
}
