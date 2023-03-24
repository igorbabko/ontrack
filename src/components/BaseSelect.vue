<script setup>
defineProps(['selected', 'options', 'placeholder']);
defineEmits(['change']);
</script>

<template>
  <select class="py-1 px-2 rounded">
    <option :value="null">{{ placeholder }}</option>
    <option v-for="label, value in options" :value="value" :selected="value === selected">
      {{ label }}
    </option>
  </select>
</template>
