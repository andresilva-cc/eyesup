<script setup lang="ts">
import { PhArrowsClockwise } from '@phosphor-icons/vue';

const timer = useTimerStore();

const disconnectedClasses = 'bg-rose-500';
const connectingClasses = 'bg-amber-500 animate-pulse';
const connectedClasses = 'bg-emerald-600';

const statusClasses = computed(() => {
  if (timer.socketState === 'disconnected') {
    return disconnectedClasses;
  }

  if (timer.socketState === 'ready') {
    return connectedClasses;
  }

  return connectingClasses;
});
</script>

<template>
  <Button
    icon
    title="Synchronize"
    class="relative"
  >
    <span
      class="w-3 h-3 absolute top-0 right-0 border border-white rounded-full"
      :class="statusClasses"
    />
    <PhArrowsClockwise :size="24" />
  </Button>
</template>
