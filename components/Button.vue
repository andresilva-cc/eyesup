<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  color?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'secondary',
});

const primaryClasses = 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rest:bg-white rest:hover:bg-zinc-200 rest:active:bg-zinc-300 rest:text-black';
const secondaryClasses = 'bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 text-emerald-950 rest:bg-white/20 rest:backdrop-saturate-80 rest:hover:bg-white/30 rest:active:bg-white/40 rest:text-white';

const currentColorClasses = computed(() => {
  if (props.color === 'primary') return primaryClasses;

  return secondaryClasses;
});
</script>

<template>
  <button
    class="p-2 rounded-full cursor-pointer transition-colors duration-500"
    :class="currentColorClasses"
  >
    <slot />
  </button>
</template>
