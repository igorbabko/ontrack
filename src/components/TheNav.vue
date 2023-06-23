<script setup>
import { NAV_ITEMS } from '../constants'
import NavItem from './NavItem.vue'
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem v-for="(icon, page) in NAV_ITEMS" :key="page" :page="page">
        <component :is="icon" class="h-6 w-6" /> {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>
