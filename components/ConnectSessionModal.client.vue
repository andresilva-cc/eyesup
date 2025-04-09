<script setup lang="ts">
import { PhCircleNotch } from '@phosphor-icons/vue';

const timer = useTimerStore();

timer.connectSocket();

const emit = defineEmits<{
  openViewSessionModal: [];
  closeModal: [];
}>();

watch(() => timer.socketState, () => {
  if (timer.socketState === 'ready') {
    if (timer.syncType === 'host') {
      emit('openViewSessionModal');
    }

    closeModal();
  }
});

const isLoading = ref(true);
const message = ref('Loading...');

watch(() => timer.socketError, () => {
  if (timer.socketError) {
    message.value = timer.socketError.message;
    isLoading.value = false;
  }
});

const title = computed(() => {
  if (timer.syncType === 'host') return 'Create Session';

  return 'Join Session';
});

function cancelConnection() {
  timer.disconnectSocket();
  closeModal();
}

function closeModal() {
  emit('closeModal');
}
</script>

<template>
  <Modal>
    <template #header>
      <h2 class="text-xl font-semibold uppercase">
        {{ title }}
      </h2>
    </template>

    <template #body>
      <div class="max-w-xs flex flex-col items-center">
        <PhCircleNotch
          v-if="isLoading"
          :size="32"
          class="mb-1 animate-spin"
        />
        <p>{{ message }}</p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center">
        <Button @click="cancelConnection">
          Cancel
        </Button>
      </div>
    </template>
  </Modal>
</template>
