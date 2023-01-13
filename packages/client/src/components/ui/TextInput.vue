<script setup lang="ts">
import type { Nullable } from '@daria/shared';

const props = withDefaults(
  defineProps<{
    modelValue: Nullable<string>;
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
const slots = useSlots();
</script>

<template>
  <div class="text-input" :class="{ left: !!slots.left, right: slots.right }">
    <slot name="left" />

    <input
      v-model="vModel"
      :id="props.id"
      :name="props.name"
      :type="props.type"
      :disabled="props.disabled"
    />
    <slot name="right" />
  </div>
</template>

<style scoped>
.text-input {
  display: flex;
  align-items: center;
  background-color: var(--color-surface);
  border: solid 1px hsl(var(--black), 85%);
}

.text-input.left {
  padding-inline-start: var(--space-3);
}

.text-input.right {
  padding-inline-end: var(--space-3);
}
.text-input:focus-within {
  border-color: var(--color-primary);
}

.text-input:has(.input:disabled) {
  background-color: hsl(var(--black), 85%);
}

.text-input > input {
  flex-grow: 1;
  background-color: inherit;
  color: inherit;
  padding-inline: var(--space-3);
  padding-block: var(--space-2);
  min-width: 0;
}
</style>
