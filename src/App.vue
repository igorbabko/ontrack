<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const navItems = ['timeline', 'activities', 'progress']
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <a href="#">
      <img src="./assets/logo.png" alt="Logo" class="h-9" />
    </a>
    <a href="#" class="text-sm">
      <div v-if="false" class="flex items-center gap-1">
        Day complete!
        <CheckCircleIcon class="h-7 text-green-500" />
      </div>
      <div v-else class="flex items-center gap-1">
        <div>Progress: <span class="font-mono">20%</span></div>
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
  </header>

  <main class="flex flex-grow flex-col"></main>

  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <li v-for="page in navItems" :key="page" class="flex-1">
        <a :href="`#${page}`" class="flex flex-col items-center p-2 text-xs capitalize">
          <ClockIcon v-if="page === 'timeline'" class="h-6 w-6" />
          <ListBulletIcon v-else-if="page === 'activities'" class="h-6 w-6" />
          <ChartBarIcon v-else class="h-6 w-6" /> {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>
