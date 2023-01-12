<script setup lang="ts">
import type { Nullable } from '@daria/shared';

const props = defineProps<{
  name: string;
  id: string;
  modelValue: Nullable<string>;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const vModel = useVModel(props, 'modelValue', emit);
const isPasswordShown = ref(false);
const type = computed(() => (isPasswordShown.value ? 'text' : 'password'));
</script>

<template>
  <UiTextInput v-model="vModel" :id="props.id" :name="props.name" :type="type">
    <template #right>
      <button
        type="button"
        h-full
        aspect-square
        :title="isPasswordShown ? 'hide password' : 'show password'"
        @click="isPasswordShown = !isPasswordShown"
      >
        show / hide
      </button>
    </template>
  </UiTextInput>
</template>
