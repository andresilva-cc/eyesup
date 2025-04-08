<script setup lang="ts">
import { PhGear } from '@phosphor-icons/vue';

const showSynchronizationModal = ref(false);
const showLoadingSessionModal = ref(false);
const showSessionModal = ref(false);
const showJoinSessionModal = ref(false);
const showSettingsModal = ref(false);

const timer = useTimerStore();

function openSynchronizationModal() {
  if (timer.socketState === 'ready') {
    showSessionModal.value = true;
    return;
  }

  showSynchronizationModal.value = true;
}

function openCreateSessionModal() {
  timer.syncType = 'host';
  showLoadingSessionModal.value = true;
}

function openJoinSessionModal() {
  timer.syncType = 'client';
  showJoinSessionModal.value = true;
}

function joinSession(sessionId: string) {
  timer.syncType = 'client';
  timer.sessionId = sessionId;
  showLoadingSessionModal.value = true;
}
</script>

<template>
  <header class="flex justify-end gap-4 p-4 z-10">
    <SynchronizationButton
      @click="openSynchronizationModal"
    />

    <Button
      icon
      title="Settings"
      @click="showSettingsModal = true"
    >
      <PhGear
        :size="24"
      />
    </Button>

    <SynchronizationModal
      v-model="showSynchronizationModal"
      @request-create-session="openCreateSessionModal"
      @request-join-session="openJoinSessionModal"
    />

    <LoadingSessionModal
      v-if="showLoadingSessionModal"
      v-model="showLoadingSessionModal"
      @request-show-session="showSessionModal = true"
    />

    <JoinSessionModal
      v-model="showJoinSessionModal"
      @request-join-session="joinSession"
    />

    <SessionModal v-model="showSessionModal" />

    <SettingsModal v-model="showSettingsModal" />
  </header>
</template>
