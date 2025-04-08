<script setup lang="ts">
const showModal = defineModel<boolean>();

const emit = defineEmits<{
  requestJoinSession: [sessionId: string];
}>();

const sessionId = ref('');

function connect() {
  emit('requestJoinSession', sessionId.value);
  showModal.value = false;
}
</script>

<template>
  <Modal v-model="showModal">
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
          @click="connect"
        >
          Connect
        </Button>

        <Button @click="showModal = false">
          Cancel
        </Button>
      </div>
    </template>
  </Modal>
</template>
