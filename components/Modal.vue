<script setup lang="ts">
const showModal = defineModel<boolean>();
</script>

<template>
  <div
    v-if="showModal"
    class="w-screen h-screen fixed left-0 top-0 flex items-center justify-center"
  >
    <div class="w-screen h-screen bg-gray-950/40 backdrop-blur-xs" />

    <div class="rest-theme-off min-w-xs absolute p-4 bg-white text-emerald-950 rounded-xl">
      <header
        v-if="$slots.header"
        class="text-center mb-4"
      >
        <slot name="header" />
      </header>

      <div>
        <slot name="body" />
      </div>

      <footer
        v-if="$slots.footer"
        class="mt-8"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
