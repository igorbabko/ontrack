<script setup>
import { computed } from 'vue';
import { formatTime } from '../functions';

const props = defineProps(['seconds']);

const time = computed(() => formatTime(props.seconds.value));
</script>

<template>
  <div class="font-mono flex items-center text-sm bg-gray-100 rounded px-2">{{ time }}</div>
</template>
