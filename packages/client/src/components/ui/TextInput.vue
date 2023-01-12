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
</script>

<template>
  <div style="display: flex; background: white; width: fit-content">
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
