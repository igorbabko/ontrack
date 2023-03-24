export const id = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const codingId = id();
const trainingId = id();
const readingId = id();

export const activities = {
  [codingId]: 'Coding',
  [trainingId]: 'Training',
  [readingId]: 'Reading',
};

export const goals = {
  [codingId]: 60,
  [trainingId]: 120,
  // [readingId]: 30,
};

export const timelineItems = [
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: null,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
  {
    activityId: codingId,
    time: 4100,
  },
];
