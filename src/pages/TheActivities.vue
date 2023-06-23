<script setup>
import { validateActivities, isActivityValid } from '../validators'
import ActivityItem from '../components/ActivityItem.vue'
import TheActivityForm from '../components/TheActivityForm.vue'
import TheActivitiesEmptyState from '../components/TheActivitiesEmptyState.vue'

defineProps({
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  }
})

const emit = defineEmits({
  deleteActivity: isActivityValid
})
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm />
  </div>
</template>
