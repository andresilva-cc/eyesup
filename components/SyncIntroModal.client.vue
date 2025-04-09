<script setup lang="ts">
const emit = defineEmits<{
  openCreateSessionModal: [];
  openJoinSessionModal: [];
  closeModal: [];
}>();

function openCreateSessionModal() {
  emit('openCreateSessionModal');
  closeModal();
}

function openJoinSessionModal() {
  emit('openJoinSessionModal');
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
        Synchronization
      </h2>
    </template>

    <template #body>
      <div class="flex flex-col items-center gap-4">
        <p class="max-w-xs">
          Easily keep your timer and settings in sync across all your devices.
        </p>

        <Button
          color="primary"
          @click="openCreateSessionModal"
        >
          Create Session
        </Button>
        <Button
          color="primary"
          @click="openJoinSessionModal"
        >
          Join Session
        </Button>
        <Button @click="closeModal">
          Cancel
        </Button>
      </div>
    </template>
  </Modal>
</template>
