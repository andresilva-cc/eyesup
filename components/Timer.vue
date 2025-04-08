<script setup lang="ts">
import { PhPlay, PhPause, PhArrowCounterClockwise } from '@phosphor-icons/vue';
import type { Cycle } from '~/types/Cycle';

const currentCycle = useState<Cycle>('currentCycle', () => 'work');
const settings = useSettings();
const timer = useTimerStore();

// Initial values
timer.duration = settings.value.workDuration;
timer.remaining = settings.value.workDuration;

function handleTimerFinished() {
  timer.state = 'idle';

  const newCycle = currentCycle.value === 'work' ? 'rest' : 'work';
  const newDuration = newCycle === 'work' ? settings.value.workDuration : settings.value.restDuration;

  currentCycle.value = newCycle;
  timer.duration = newDuration;
  timer.remaining = newDuration;
}

function handleTimerReset() {
  currentCycle.value = 'work';
  timer.duration = settings.value.workDuration;
}

watch(() => timer.state, () => {
  if (timer.state === 'finished') {
    handleTimerFinished();
  }
});

timer.$onAction(({
  name,
}) => {
  if (name === 'reset') {
    handleTimerReset();
  }
});

function updateDuration(newDuration: number) {
  timer.duration = newDuration;

  if (timer.state === 'idle') {
    timer.remaining = newDuration;
  }
}

watch(() => settings.value.workDuration, () => {
  if (currentCycle.value === 'rest') return;

  updateDuration(settings.value.workDuration);
});

watch(() => settings.value.restDuration, () => {
  if (currentCycle.value === 'work') return;

  updateDuration(settings.value.restDuration);
});

const currentCycleText = computed(() => {
  if (currentCycle.value === 'work') {
    return 'Keep working';
  }

  return 'Take a rest';
});

const formattedRemaining = computed(() => {
  return formatDuration(timer.remaining);
});

const toggleButtonTitle = computed(() => {
  if (timer.state === 'running') return 'Pause';

  return 'Start';
});

const toggleTimerIcon = computed(() => {
  if (timer.state === 'running') return PhPause;

  return PhPlay;
});

function toggleTimer() {
  if (timer.state === 'running') {
    return timer.pause();
  }

  if (timer.state === 'paused') {
    return timer.resume();
  }

  timer.start();
}
</script>

<template>
  <div class="flex flex-col gap-4 py-8 border rounded-4xl border-emerald-700 rest:border-white/85 transition-colors duration-500">
    <p class="uppercase font-semibold text-lg">
      {{ currentCycleText }}
    </p>

    <code class="block text-8xl font-medium tracking-tighter">
      <ClientOnly fallback="--:--">
        {{ formattedRemaining }}
      </ClientOnly>
    </code>

    <div class="flex gap-4 justify-center">
      <Button
        color="primary"
        icon
        :title="toggleButtonTitle"
        @click="toggleTimer"
      >
        <component
          :is="toggleTimerIcon"
          :size="24"
          weight="bold"
          :color="currentCycle === 'work' ? '#fff' : '#000'"
        />
      </Button>
      <Button
        icon
        title="Reset"
        @click="timer.reset()"
      >
        <PhArrowCounterClockwise
          :size="24"
          weight="bold"
          :color="currentCycle === 'work' ? '#000' : '#fff'"
        />
      </Button>
    </div>
  </div>
</template>
