<script setup>
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '../validators'
import BaseButton from './BaseButton.vue'

const emit = defineEmits({
  submit: isActivityValid
})

const activity = ref('')

function submit() {
  emit('submit', activity.value)

  activity.value = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="activity"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="activity.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
