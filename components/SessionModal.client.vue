<script setup lang="ts">
const showModal = defineModel<boolean>();

const timer = useTimerStore();

function closeModal() {
  showModal.value = false;
}

function disconnect() {
  timer.disconnectSocket();
  closeModal();
}
</script>

<template>
  <Modal v-model="showModal">
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
          <code class="mt-2 px-4 py-2 bg-gray-200 rounded-lg">{{ timer.sessionId }}</code>
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
