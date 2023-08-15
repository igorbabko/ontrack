<script setup>
import { ICONS } from '../icons'
import { isIconValid } from '../validators'

defineProps({
  name: {
    required: true,
    type: String,
    validator: isIconValid
  }
})
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
