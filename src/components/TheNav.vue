<script setup>
import { ClockIcon, ListBulletIcon } from '@heroicons/vue/24/outline';
import NavItem from './NavItem.vue'

defineProps(['currentPage']);

const emit = defineEmits(['go']);

const navItems = {
  timeline: ClockIcon,
  activities: ListBulletIcon,
}
</script>

<template>
  <nav class="sticky bottom-0 bg-white">
    <ul class="flex justify-around items-center list-style-none border-t w-screen">
      <NavItem
        v-for="icon, page in navItems"
        :href="`#${page}`"
        :selected="page === currentPage"
        @click="emit('go', page)">
        <component :is="icon" class="h-6 w-6" /> {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>
