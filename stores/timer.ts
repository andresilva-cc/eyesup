import type { TimerState } from '~/types/TimerState';

const INTERVAL_DELAY = 100; // ms

export const useTimerStore = defineStore('timer', () => {
  const state = ref<TimerState>('idle');

  const duration = ref();
  const remaining = ref(0);
  const lastTick = ref<number | null>(null);

  let interval: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (state.value !== 'idle') return;

    remaining.value = duration.value;
    lastTick.value = Date.now();
    state.value = 'running';
    tick();
  }

  function tick() {
    clear();

    interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - (lastTick.value ?? now);
      lastTick.value = now;
      remaining.value = Math.max(remaining.value - elapsed, 0);

      if (remaining.value === 0) {
        state.value = 'finished';
        clear();
      }
    }, INTERVAL_DELAY);
  }

  function pause() {
    if (state.value !== 'running') return;

    clear();
    state.value = 'paused';
  }

  function resume() {
    if (state.value !== 'paused') return;

    lastTick.value = Date.now();
    state.value = 'running';
    tick();
  }

  function reset() {
    clear();
    state.value = 'idle';
    remaining.value = duration.value;
    lastTick.value = null;
  }

  function clear() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  return {
    state,
    remaining,
    duration,
    start,
    pause,
    resume,
    reset,
  };
});
