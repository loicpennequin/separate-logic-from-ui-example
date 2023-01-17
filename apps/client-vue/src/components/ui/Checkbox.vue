<script setup lang="ts">
import * as foo from '@iconify-json/mdi';

console.log(foo);
const props = withDefaults(
  defineProps<{
    modelValue: string | boolean;
    name: string;
    type?: string;
    id: string;
    disabled?: boolean;
  }>(),
  { type: 'text', disabled: false }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <label :for="props.id">
    <input
      v-model="vModel"
      :id="props.id"
      :name="props.name"
      :type="props.type"
      :disabled="props.disabled"
    />

    <slot />
  </label>
</template>

<style scoped>
label {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

input[type='checkbox'] {
  height: var(--space-5);
  aspect-ratio: 1;
  background-color: red;
}
</style>
