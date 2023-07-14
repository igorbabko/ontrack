<script setup>
import { PAGE_TIMELINE } from '../constants'
import { navigate } from '../router'
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img src="../assets/img/logo.png" alt="Logo" class="h-9" />
  </a>
</template>
