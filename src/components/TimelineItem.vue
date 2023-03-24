<script setup>
import StopwatchItem from './StopwatchItem.vue';

defineProps(['timelineItem', 'activities', 'hour']);

const emit = defineEmits(['selectActivity']);
</script>

<template>
  <li class="p-4 flex items-center">
    <div class="flex flex-col items-center">
      <span
        class="font-black"
        :class="[
          { 'font-black text-purple-500': hour === 3 },
          { 'text-slate-300': [0, 1, 2].includes(hour) }
        ]">{{ hour }}</span>

      <!-- <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->

      <!-- <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> -->
    </div>
    <div class="flex gap-2 mr-auto ml-4">
      <select class="py-1 px-2 rounded" @change="emit('changeActivity', $event)">
        <option v-for="name, id in { name: 'Rest', ...activities }"
          :selected="id === timelineItem.activityId">{{
            name }}</option>
      </select>
    </div>
    <StopwatchItem :time="timelineItem.time" />
  </li>
</template>
