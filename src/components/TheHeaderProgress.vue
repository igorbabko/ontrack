<script setup>
import { PAGE_PROGRESS } from '../constants'
import { ICON_CHECK_CIRCLE } from '../icons'
import { navigate } from '../router'
import BaseIcon from './BaseIcon.vue'
</script>

<template>
  <a :href="`#${PAGE_PROGRESS}`" @click="navigate(PAGE_PROGRESS)" class="text-sm">
    <div v-if="true" class="flex items-center gap-1">
      Day complete!
      <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>Progress: <span class="font-mono">20%</span></div>
      <div class="h-3 w-3 rounded-full bg-red-500" />
    </div>
  </a>
</template>
