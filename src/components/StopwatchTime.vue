<script setup>
import { computed } from 'vue';
import { formatTime } from '../functions';

const props = defineProps(['seconds', 'disabled']);

const time = computed(() => formatTime(props.seconds));
</script>

<template>
  <div :class="`font-mono flex text-3xl flex-grow items-center bg-gray-100 rounded px-2 ${disabled ? 'opacity-50' : ''}`">
    {{ time }}
  </div>
</template>
