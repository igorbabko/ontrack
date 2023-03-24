import { ref, computed } from 'vue';

export function useStopwatch(currentTime) {
  const timerState = ref('paused');

  let stopwatch = null;

  const time = ref(currentTime);

  function start() {
    timerState.value = 'running';

    stopwatch = setInterval(() => {
      time.value++;
    }, 1000);
  }

  function reset() {
    time.value = 0;
  }

  function pause() {
    timerState.value = 'paused';

    clearInterval(stopwatch);
  }

  // function stop() {
  //   timerState.value = 'stopped';
  //   time.value = 0;

  //   clearInterval(stopwatch);
  // }

  const date = new Date(null);

  const formattedTime = computed(() => {
    date.setTime(time.value * 1000);

    const utc = date.toUTCString();

    return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
  });

  return {
    formattedTime,
    time,
    state: timerState,
    start,
    pause,
    reset,
  }
}
