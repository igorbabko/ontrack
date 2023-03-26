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

export const timelineItems = [
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
  {
    activityId: null,
    seconds: 0,
  },
]

// export const timelineItems = [
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: null,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: null,
//     time: null,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: null,
//     time: null,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: null,
//     time: null,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
//   {
//     activityId: codingId,
//     time: 0,
//   },
// ];
