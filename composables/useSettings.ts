import { useStorage } from '@vueuse/core';

const DEFAULT_WORK_DURATION = 20 * 60_000; // 20 minutes
const DEFAULT_REST_DURATION = 20 * 1000; // 20 seconds

export interface Settings {
  workDuration: number;
  restDuration: number;
}

export const useSettings = () => {
  return useStorage<Settings>(
    'settings',
    {
      workDuration: DEFAULT_WORK_DURATION,
      restDuration: DEFAULT_REST_DURATION,
    },
  );
};
