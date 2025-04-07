<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  color?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'secondary',
});
</script>

<template>
  <button
    class="p-2 rounded-full cursor-pointer transition-colors"
    :class="{
      'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white': props.color === 'primary',
      'bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 text-emerald-950': props.color === 'secondary',
    }"
  >
    <slot />
  </button>
</template>
