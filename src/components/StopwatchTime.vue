<script setup>
const props = defineProps(['seconds']);

const date = new Date();

const formattedTime = computed(() => {
  date.setTime(props.seconds.value * 1000);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
});
</script>

<template>
  <div class="font-mono flex items-center text-sm bg-gray-100 rounded px-2">{{ formattedTime }}</div>
</template>
