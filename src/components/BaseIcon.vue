<script setup>
import {
  CheckCircleIcon as CheckCircle,
  ListBulletIcon as ListBullet,
  ArrowPathIcon as ArrowPath,
  ChartBarIcon as ChartBar,
  ClockIcon as Clock,
  TrashIcon as Trash,
  XMarkIcon as XMark,
  PauseIcon as Pause,
  PlayIcon as Play,
  PlusIcon as Plus
} from '@heroicons/vue/24/outline'

defineProps({
  name: {
    required: true,
    type: String,
  }
})

const icons = {
  CheckCircle,
  ListBullet,
  ArrowPath,
  ChartBar,
  Clock,
  Trash,
  XMark,
  Pause,
  Play,
  Plus
}
</script>

<template>
  <component :is="icons[name]" />
</template>
