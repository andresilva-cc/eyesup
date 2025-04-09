<script setup lang="ts">
import { PhGear } from '@phosphor-icons/vue';

const timer = useTimerStore();

const isSyncIntroModalVisible = ref(false);

function toggleSyncIntroModal() {
  isSyncIntroModalVisible.value = !isSyncIntroModalVisible.value;
}

const isConnectSessionModalVisible = ref(false);

function toggleConnectSessionModal() {
  isConnectSessionModalVisible.value = !isConnectSessionModalVisible.value;
}

function toggleCreateSessionModal() {
  timer.syncType = 'host';
  toggleConnectSessionModal();
}

const isJoinSessionModalVisible = ref(false);

function toggleJoinSessionModal() {
  timer.syncType = 'client';
  isJoinSessionModalVisible.value = !isJoinSessionModalVisible.value;
}

const isViewSessionModalVisible = ref(false);

function toggleViewSessionModal() {
  isViewSessionModalVisible.value = !isViewSessionModalVisible.value;
}

function handleSyncButtonClick() {
  if (timer.socketState === 'ready') {
    return toggleViewSessionModal();
  }

  toggleSyncIntroModal();
}

function joinSession(sessionId: string) {
  timer.syncType = 'client';
  timer.sessionId = sessionId;

  toggleConnectSessionModal();
}

const isSettingsModalVisible = ref(false);

function toggleSettingsModal() {
  isSettingsModalVisible.value = !isSettingsModalVisible.value;
}
</script>

<template>
  <header class="flex justify-end gap-4 p-4 z-10">
    <!-- Buttons -->
    <SyncButton
      @click="handleSyncButtonClick"
    />

    <Button
      icon
      title="Settings"
      @click="toggleSettingsModal"
    >
      <PhGear
        :size="24"
      />
    </Button>

    <!-- Modals -->
    <LazySyncIntroModal
      v-if="isSyncIntroModalVisible"
      @open-create-session-modal="toggleCreateSessionModal"
      @open-join-session-modal="toggleJoinSessionModal"
      @close-modal="toggleSyncIntroModal"
    />

    <LazyConnectSessionModal
      v-if="isConnectSessionModalVisible"
      @open-view-session-modal="toggleViewSessionModal"
      @close-modal="toggleConnectSessionModal"
    />

    <LazyJoinSessionModal
      v-if="isJoinSessionModalVisible"
      @join-session="joinSession"
      @close-modal="toggleJoinSessionModal"
    />

    <LazyViewSessionModal
      v-if="isViewSessionModalVisible"
      @close-modal="toggleViewSessionModal"
    />

    <LazySettingsModal
      v-if="isSettingsModalVisible"
      @close-modal="toggleSettingsModal"
    />
  </header>
</template>
