<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode';

const timer = useTimerStore();

const emit = defineEmits<{
  closeModal: [];
}>();

function closeModal() {
  emit('closeModal');
}

function disconnect() {
  timer.disconnectSocket();
  closeModal();
}

const config = useRuntimeConfig();

const qrCode = useQRCode(`${config.public.appUrl}/?session=${timer.sessionId}`);
</script>

<template>
  <Modal>
    <template #header>
      <h2 class="text-xl font-semibold uppercase">
        Session
      </h2>
    </template>

    <template #body>
      <div class="max-w-xs">
        <div
          class="flex flex-col items-center"
        >
          <p>To connect from another device, use the code below</p>
          <code class="mt-2 mb-8 px-4 py-2 bg-gray-200 rounded-lg">{{ timer.sessionId }}</code>
          <p class="self-start">
            Or simply scan the QR code
          </p>
          <img
            :src="qrCode"
            alt="QR Code"
          >
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center gap-4">
        <Button
          color="primary"
          @click="closeModal"
        >
          Done
        </Button>
        <Button @click="disconnect">
          Disconnect
        </Button>
      </div>
    </template>
  </Modal>
</template>
