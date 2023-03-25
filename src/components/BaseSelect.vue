<script setup>
defineProps(['selected', 'options', 'placeholder']);
</script>

<template>
  <select class="py-1 px-2 rounded bg-gray-100">
    <option>{{ placeholder }}</option>
    <option v-for="label, value in options" :value="value" :selected="value == selected">
      {{ label }}
    </option>
  </select>
</template>
