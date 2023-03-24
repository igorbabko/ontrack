<script setup>
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';
import NavItem from './NavItem.vue'

defineProps(['page']);

const emit = defineEmits(['go']);
</script>

<template>
  <nav class="sticky bottom-0 bg-white">
    <ul class="flex justify-around items-center list-style-none border-t w-screen">
      <NavItem :href="`#${page}`" :selected="page === 'timeline'" @click="emit('go', 'timeline')">
        <ClockIcon class="h-6 w-6" /> Timeline
      </NavItem>
      <NavItem :href="`#${page}`" :selected="page === 'activities'" @click="emit('go', 'activities')">
        <ListBulletIcon class="h-6 w-6" /> Activities
      </NavItem>
      <NavItem :href="`#${page}`" :selected="page === 'stats'" @click="emit('go', 'stats')">
        <ChartBarIcon class="h-6 w-6" /> Goals
      </NavItem>
    </ul>
  </nav>
</template>
