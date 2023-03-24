import { onMounted, onUpdated } from 'vue';

export function useProgress(el) {
  onMounted(() => {
    updateHeight();

    setInterval(updateHeight, 60 * 1000);
  });

  onUpdated(updateHeight);

  function updateHeight() {
    el.value.$el.style.height = `${height()}px`;
  }

  function height() {
    const secondsPercentage = 100 * seconds() / 86400;

    return secondsPercentage * el.value.$el.parentNode.getBoundingClientRect().height / 100;
  }

  function seconds() {
    const now = new Date();

    return now.getSeconds() + (60 * now.getMinutes()) + (60 * 60 * now.getHours());
  }
}
