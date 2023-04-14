<script setup>
import { generateTimelineItems } from '../functions'

const timelineItems = generateTimelineItems()
</script>

<template>
  <div class="mt-7">
    <ul>
      <li
        v-for="{ hour } in timelineItems"
        :key="hour"
        class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4"
      >
        <a
          href="#"
          class="absolute -top-4 left-1/2 -translate-x-1/2 rounded bg-gray-100 px-2 font-mono text-lg text-gray-500"
        >
          {{ hour }}:00
        </a>
      </li>
    </ul>
  </div>
</template>
