<script setup lang="ts">
const showModal = defineModel<boolean>();

const workDurationOptions = [
  { value: 10 * 60_000, text: '10 minutes' },
  { value: 15 * 60_000, text: '15 minutes' },
  { value: 20 * 60_000, text: '20 minutes (recommended)' },
  { value: 25 * 60_000, text: '25 minutes' },
  { value: 30 * 60_000, text: '30 minutes' },
];

const restDurationOptions = [
  { value: 10 * 1000, text: '10 seconds' },
  { value: 20 * 1000, text: '20 seconds (recommended)' },
  { value: 30 * 1000, text: '30 seconds' },
  { value: 45 * 1000, text: '45 seconds' },
  { value: 1 * 60_000, text: '1 minute' },
  { value: 2 * 60_000, text: '2 minutes' },
];

const settings = useSettings();

const selectedWorkDuration = ref(settings.value.workDuration);
const selectedRestDuration = ref(settings.value.restDuration);

function resetSettings() {
  selectedWorkDuration.value = settings.value.workDuration;
  selectedRestDuration.value = settings.value.restDuration;
}

function closeSettings() {
  resetSettings();
  showModal.value = false;
}

function saveSettings() {
  settings.value.workDuration = selectedWorkDuration.value;
  settings.value.restDuration = selectedRestDuration.value;
  closeSettings();
}
</script>

<template>
  <Modal v-model="showModal">
    <template #header>
      <h2 class="text-xl font-semibold uppercase">
        Settings
      </h2>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <Select
          id="work-duration-options"
          v-model="selectedWorkDuration"
          :items="workDurationOptions"
          label="Work duration"
        />
        <Select
          id="rest-duration-options"
          v-model="selectedRestDuration"
          :items="restDurationOptions"
          label="Rest duration"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center gap-4">
        <Button
          color="primary"
          @click="saveSettings"
        >
          Done
        </Button>

        <Button @click="closeSettings">
          Cancel
        </Button>
      </div>
    </template>
  </Modal>
</template>
