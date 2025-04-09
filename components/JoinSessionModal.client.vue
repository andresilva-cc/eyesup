<script setup lang="ts">
const emit = defineEmits<{
  joinSession: [sessionId: string];
  closeModal: [];
}>();

const sessionId = ref('');

function joinSession() {
  emit('joinSession', sessionId.value);
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
        Join Session
      </h2>
    </template>

    <template #body>
      <div class="max-w-xs flex flex-col gap-4">
        <p>Enter the code to join an existing session</p>
        <input
          v-model="sessionId"
          class="p-1 border border-emerald-700 rounded-lg"
        >
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center gap-4">
        <Button
          color="primary"
          @click="joinSession"
        >
          Connect
        </Button>

        <Button @click="closeModal">
          Cancel
        </Button>
      </div>
    </template>
  </Modal>
</template>
