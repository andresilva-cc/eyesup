<script setup lang="ts">
import { PhPlay, PhPause, PhArrowCounterClockwise } from '@phosphor-icons/vue';
import type { Cycle } from '~/types/Cycle';

const INTERVAL_DELAY = 100; // ms
const WORK_DURATION = 20 * 60 * 1000; // 20 minutes
const REST_DURATION = 20 * 1000; // 20 seconds

const currentCycle = ref<Cycle>('work');
const remaining = ref(WORK_DURATION);
const isRunning = ref(false);
const lastTick = ref<number | null>(null);
let intervalId: ReturnType<typeof setInterval> | null = null;

const currentCycleText = computed(() => {
  if (currentCycle.value === 'work') {
    return 'Keep working';
  }

  return 'Take a rest';
});

const formattedRemaining = computed(() => {
  return formatDuration(remaining.value);
});

const toggleTimerIcon = computed(() => {
  if (isRunning.value) return PhPause;

  return PhPlay;
});

function startTimer() {
  if (isRunning.value) return;
  isRunning.value = true;

  lastTick.value = Date.now();

  intervalId = setInterval(() => {
    const now = Date.now();
    const elapsed = now - (lastTick.value ?? now);
    remaining.value = Math.max(remaining.value - elapsed, 0);
    lastTick.value = now;

    if (remaining.value <= 0) {
      const nextCycle = currentCycle.value === 'work' ? 'rest' : 'work';
      resetTimer(nextCycle);
      currentCycle.value = nextCycle;
    }
  }, INTERVAL_DELAY);
}

function pauseTimer() {
  if (!isRunning.value) return;
  isRunning.value = false;

  if (intervalId) clearInterval(intervalId);

  const now = Date.now();
  const elapsed = now - (lastTick.value ?? now);
  remaining.value = Math.max(remaining.value - elapsed, 0);
  lastTick.value = null;
}

function resetTimer(cycle: Cycle) {
  isRunning.value = false;
  lastTick.value = null;
  if (intervalId) clearInterval(intervalId);

  remaining.value = cycle === 'work' ? WORK_DURATION : REST_DURATION;
  currentCycle.value = cycle;
}

function toggleTimer() {
  if (isRunning.value) {
    pauseTimer();
    return;
  }

  startTimer();
}
</script>

<template>
  <div class="flex flex-col gap-4 py-8 border rounded-4xl border-emerald-700">
    <p class="uppercase font-semibold text-lg">
      {{ currentCycleText }}
    </p>

    <code class="block text-8xl font-medium tracking-tighter">
      {{ formattedRemaining }}
    </code>

    <div class="flex gap-4 justify-center">
      <button
        class="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
        @click="toggleTimer"
      >
        <component
          :is="toggleTimerIcon"
          :size="24"
          weight="bold"
          color="#fff"
        />
      </button>
      <button
        class="p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 transition-colors"
        @click="resetTimer('work')"
      >
        <PhArrowCounterClockwise
          :size="24"
          weight="bold"
          color="#000"
        />
      </button>
    </div>
  </div>
</template>
