<script setup lang="ts">
import { Cycle } from '~/types/Cycle';

const currentCycle = useState<Cycle>('currentCycle', () => Cycle.Work);
</script>

<template>
  <main
    class="min-h-screen flex items-center justify-center bg-emerald-50/15 text-emerald-950 rest:bg-emerald-700 rest:text-white transition-colors duration-500"
    :class="{ rest: currentCycle === Cycle.Rest }"
  >
    <slot />
  </main>
</template>
