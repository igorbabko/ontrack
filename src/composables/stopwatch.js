import { ref, computed } from 'vue';

export function useStopwatch(currentTime) {

  return {
    formattedTime,
    time,
    state: timerState,
    start,
    pause,
    reset,
  }
}
