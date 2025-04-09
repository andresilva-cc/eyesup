import type { Cycle } from '~/types/Cycle';
import type { ErrorMessage, Message, PauseMessage, ResetMessage, ResumeMessage, StartMessage, SyncMessage } from '~/types/Message';
import type { SocketState } from '~/types/SocketState';
import type { TimerState } from '~/types/TimerState';

const INTERVAL_DELAY = 100; // ms

export const useTimerStore = defineStore('timer', () => {
  const timerState = ref<TimerState>('idle');
  const currentCycle = useState<Cycle>('currentCycle', () => 'work');

  const duration = ref(0);
  const remaining = ref(0);
  const lastTick = ref<number | null>(null);

  let interval: ReturnType<typeof setInterval> | null = null;

  let socket: WebSocket | null = null;
  const syncType = ref<'host' | 'client' | null>(null);
  const socketState = ref<SocketState>('disconnected');
  const sessionId = ref<string | null>(null);
  const socketError = ref<ErrorMessage | null>(null);
  let isExternalSync = false;
  const unwatchSettings = ref<ReturnType<typeof watch> | null>(null);

  const settings = useSettings();

  function start(sync = true) {
    if (timerState.value !== 'idle') return;

    remaining.value = duration.value;
    lastTick.value = Date.now();
    timerState.value = 'running';
    tick();

    if (sync) {
      const message: StartMessage = {
        type: 'start',
        sessionId: sessionId.value as string,
      };
      socket?.send(JSON.stringify(message));
    }
  }

  function tick() {
    clear();

    interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - (lastTick.value ?? now);
      lastTick.value = now;
      remaining.value = Math.max(remaining.value - elapsed, 0);

      if (remaining.value === 0) {
        timerState.value = 'finished';
        clear();
      }
    }, INTERVAL_DELAY);
  }

  function pause(sync = true) {
    if (timerState.value !== 'running') return;

    clear();
    timerState.value = 'paused';

    if (sync) {
      const message: PauseMessage = {
        type: 'pause',
        sessionId: sessionId.value as string,
      };
      socket?.send(JSON.stringify(message));
    }
  }

  function resume(sync = true) {
    if (timerState.value !== 'paused') return;

    lastTick.value = Date.now();
    timerState.value = 'running';
    tick();

    if (sync) {
      const message: ResumeMessage = {
        type: 'resume',
        sessionId: sessionId.value as string,
      };
      socket?.send(JSON.stringify(message));
    }
  }

  function reset(sync = true) {
    clear();
    timerState.value = 'idle';
    remaining.value = duration.value;
    lastTick.value = null;

    if (sync) {
      const message: ResetMessage = {
        type: 'reset',
        sessionId: sessionId.value as string,
      };
      socket?.send(JSON.stringify(message));
    }
  }

  function clear() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function handleSocketOpen() {
    if (syncType.value === 'host') {
      const createSessionMessage: Message = {
        type: 'create-session',
      };

      socket!.send(JSON.stringify(createSessionMessage));
    }
    else {
      const joinSessionMessage: Message = {
        type: 'join-session',
        sessionId: sessionId.value as string,
      };

      socket!.send(JSON.stringify(joinSessionMessage));
    }

    unwatchSettings.value = watch(settings, handleSettingsUpdate);
  }

  function handleSettingsUpdate() {
    if (isExternalSync) return;

    const message: SyncMessage = {
      type: 'sync',
      sessionId: sessionId.value as string,
      payload: {
        state: timerState.value,
        duration: duration.value,
        remaining: remaining.value,
        lastTick: lastTick.value,
        currentCycle: currentCycle.value,
        settings: settings.value,
      },
    };

    socket!.send(JSON.stringify(message));
  }

  function handleSocketMessage(event: MessageEvent) {
    const message: Message = JSON.parse(event.data);

    if (message.type === 'session-created') {
      socketState.value = 'ready';
      sessionId.value = message.sessionId;
      return;
    }

    if (message.type === 'session-joined') {
      socketState.value = 'ready';
      return;
    }

    if (message.type === 'sync-request') {
      const response: SyncMessage = {
        type: 'sync',
        sessionId: sessionId.value as string,
        payload: {
          state: timerState.value,
          duration: duration.value,
          remaining: remaining.value,
          lastTick: lastTick.value,
          currentCycle: currentCycle.value,
          settings: settings.value,
        },
      };

      socket?.send(JSON.stringify(response));
      return;
    }

    if (message.type === 'sync') {
      isExternalSync = true;

      timerState.value = message.payload.state;
      duration.value = message.payload.duration;
      remaining.value = message.payload.remaining;
      lastTick.value = message.payload.lastTick;
      currentCycle.value = message.payload.currentCycle;
      settings.value = message.payload.settings;

      setTimeout(() => {
        isExternalSync = false;
      }, 100);

      if (timerState.value === 'running') {
        tick();
      }

      return;
    }

    if (message.type === 'start') {
      start(false);
      return;
    }

    if (message.type === 'pause') {
      pause(false);
      return;
    }

    if (message.type === 'resume') {
      resume(false);
      return;
    }

    if (message.type === 'reset') {
      // https://github.com/vuejs/pinia/issues/2483
      useTimerStore().reset(false);
      return;
    }

    if (message.type === 'error') {
      socketError.value = message;
      return;
    }
  }

  function handleSocketClose() {
    socketState.value = 'disconnected';

    if (unwatchSettings.value) {
      unwatchSettings.value();
      unwatchSettings.value = null;
    }
  }

  function connectSocket() {
    socketState.value = 'connecting';

    const config = useRuntimeConfig();
    socket = new WebSocket(config.public.websocketServerUrl);

    socket.onopen = handleSocketOpen;
    socket.onmessage = handleSocketMessage;
    socket.onclose = handleSocketClose;
  }

  function disconnectSocket() {
    socket?.close();
    socket = null;
    syncType.value = null;
    sessionId.value = null;
  }

  return {
    state: timerState,
    remaining,
    duration,
    start,
    pause,
    resume,
    reset,
    socketState,
    syncType,
    sessionId,
    socketError,
    connectSocket,
    disconnectSocket,
  };
});
