<script setup lang="ts">
import { PhGear } from '@phosphor-icons/vue';

const showSettingsModal = ref(false);
</script>

<template>
  <header class="flex justify-end p-4 z-10">
    <Button
      icon
      title="Settings"
      @click="showSettingsModal = true"
    >
      <PhGear :size="24" />
    </Button>

    <SettingsModal v-model="showSettingsModal" />
  </header>
</template>
