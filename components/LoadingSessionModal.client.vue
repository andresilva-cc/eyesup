<script setup lang="ts">
import { PhCircleNotch } from '@phosphor-icons/vue';

const showModal = defineModel<boolean>();

const timer = useTimerStore();

onMounted(() => {
  timer.connectSocket();
});

const emit = defineEmits<{
  requestShowSession: [];
}>();

watch(() => timer.socketState, () => {
  if (timer.socketState === 'ready') {
    if (timer.syncType === 'host') {
      emit('requestShowSession');
    }

    showModal.value = false;
  }
});

const title = computed(() => {
  if (timer.syncType === 'host') return 'Create Session';

  return 'Join Session';
});

function cancel() {
  timer.disconnectSocket();
  showModal.value = false;
}
</script>

<template>
  <Modal v-model="showModal">
    <template #header>
      <h2 class="text-xl font-semibold uppercase">
        {{ title }}
      </h2>
    </template>

    <template #body>
      <div class="max-w-xs flex flex-col items-center">
        <PhCircleNotch
          :size="32"
          class="mb-1 animate-spin"
        />
        <p>Connecting...</p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center">
        <Button @click="cancel">
          Cancel
        </Button>
      </div>
    </template>
  </Modal>
</template>
