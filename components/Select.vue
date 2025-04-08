<script setup lang="ts">
export interface SelectItem {
  value: unknown;
  text: string;
}

const selected = defineModel<unknown>();

interface SelectProps {
  id: string;
  items: Array<SelectItem>;
  label: string;
}

const props = defineProps<SelectProps>();
</script>

<template>
  <label
    :for="id"
    class="flex flex-col font-medium"
  >
    {{ props.label }}
    <select
      v-model="selected"
      :name="id"
      class="font-normal mt-1 p-1 border border-emerald-700 rounded-lg"
    >
      <option
        v-for="(item, index) in props.items"
        :key="index"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </select>
  </label>
</template>
