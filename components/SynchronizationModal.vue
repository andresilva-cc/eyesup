<script setup lang="ts">
const showModal = defineModel<boolean>();

const emit = defineEmits<{
  requestCreateSession: [];
  requestJoinSession: [];
}>();

function requestCreateSession() {
  emit('requestCreateSession');
  closeModal();
}

function requestJoinSession() {
  emit('requestJoinSession');
  closeModal();
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <Modal v-model="showModal">
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
          @click="requestCreateSession"
        >
          Create Session
        </Button>
        <Button
          color="primary"
          @click="requestJoinSession"
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
