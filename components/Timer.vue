<script setup lang="ts">
import { PhPlay, PhPause, PhArrowCounterClockwise } from '@phosphor-icons/vue';
import { Cycle } from '~/types/Cycle';

const WORK_DURATION = 20 * 60 * 1000; // 20 minutes
const REST_DURATION = 20 * 1000; // 20 seconds

const currentCycle = ref<Cycle>(Cycle.Work);

function onTimerFinished() {
  if (currentCycle.value === Cycle.Work) {
    currentCycle.value = Cycle.Rest;
    remainingTime.value = REST_DURATION;
    return;
  }

  currentCycle.value = Cycle.Work;
  remainingTime.value = WORK_DURATION;
}

function onTimerReset() {
  currentCycle.value = Cycle.Work;
  remainingTime.value = WORK_DURATION;
}

const {
  remainingTime,
  isTimerRunning,
  startTimer,
  pauseTimer,
  resetTimer,
} = useTimer(WORK_DURATION, onTimerFinished, onTimerReset);

const currentCycleText = computed(() => {
  if (currentCycle.value === Cycle.Work) {
    return 'Keep working';
  }

  return 'Take a rest';
});

const formattedRemaining = computed(() => {
  return formatDuration(remainingTime.value);
});

const toggleTimerIcon = computed(() => {
  if (isTimerRunning.value) return PhPause;

  return PhPlay;
});

function toggleTimer() {
  if (isTimerRunning.value) {
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
        @click="resetTimer"
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
