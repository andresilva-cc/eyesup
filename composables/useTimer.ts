export const useTimer = (
  initialDuration: number,
  onFinished?: () => void,
  onReset?: () => void,
) => {
  const INTERVAL_DELAY = 100; // ms

  const remainingTime = ref(initialDuration);
  const isTimerRunning = ref(false);
  const lastTick = ref<number | null>(null);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    if (isTimerRunning.value) return;
    isTimerRunning.value = true;

    lastTick.value = Date.now();

    intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - (lastTick.value ?? now);
      remainingTime.value = Math.max(remainingTime.value - elapsed, 0);
      lastTick.value = now;

      if (remainingTime.value <= 0) {
        onFinished?.();
        pauseTimer();
      }
    }, INTERVAL_DELAY);
  }

  function pauseTimer() {
    if (!isTimerRunning.value) return;
    isTimerRunning.value = false;

    if (intervalId) clearInterval(intervalId);

    const now = Date.now();
    const elapsed = now - (lastTick.value ?? now);
    remainingTime.value = Math.max(remainingTime.value - elapsed, 0);
    lastTick.value = null;
  }

  function resetTimer() {
    isTimerRunning.value = false;
    lastTick.value = null;
    if (intervalId) clearInterval(intervalId);

    remainingTime.value = initialDuration;
    onReset?.();
  }

  return {
    remainingTime,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
