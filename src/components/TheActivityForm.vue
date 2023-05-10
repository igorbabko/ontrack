<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '../validators'
import BaseButton from './BaseButton.vue'

const emit = defineEmits({
  submit: isActivityValid
})

let activity = ''

function submit() {
  emit('submit', activity)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      :value="activity"
      @input="activity = $event.target.value"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton>
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
