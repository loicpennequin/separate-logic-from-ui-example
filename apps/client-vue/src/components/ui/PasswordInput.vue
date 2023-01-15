<script setup lang="ts">
import type { Nullable } from '@daria/shared';
import EyeIcon from '~icons/mdi/eye';
import EyeOffIcon from '~icons/mdi/eye-off';

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

const icon = computed(() => (isPasswordShown.value ? EyeOffIcon : EyeIcon));
</script>

<template>
  <UiTextInput v-model="vModel" :id="props.id" :name="props.name" :type="type">
    <template #right>
      <UiButtonIcon
        type="button"
        :title="isPasswordShown ? 'hide password' : 'show password'"
        @click="isPasswordShown = !isPasswordShown"
      >
        <component :is="icon" />
      </UiButtonIcon>
    </template>
  </UiTextInput>
</template>
