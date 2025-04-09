<script setup lang="ts">
import type { Cycle } from '~/types/Cycle';

const currentCycle = useState<Cycle>('currentCycle', () => 'work');
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-emerald-50/15 text-emerald-950 rest:bg-emerald-700 rest:text-white transition-colors duration-500"
    :class="{ 'rest-theme': currentCycle === 'rest' }"
  >
    <Header />

    <main class="flex-1 flex items-center justify-center mt-[-72px] p-4">
      <slot />
    </main>
  </div>
</template>
