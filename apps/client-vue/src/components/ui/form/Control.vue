<script setup lang="ts">
const props = defineProps<{ name: string; id: string; label?: string }>();

const { value, errorMessage, meta } = useField(toRef(props, 'name'));

const bind = computed(() => ({
  id: props.id,
  name: props.name,
  modelValue: value.value as any
}));

const on = {
  'update:modelValue'(val: any) {
    value.value = val;
  }
};
</script>

<template>
  <fieldset class="form-control">
    <label v-if="props.label" :for="props.id">
      {{ props.label }}
    </label>
    <slot :bind="bind" :on="on" />
    <UiFormError v-if="errorMessage && meta.touched" :error="errorMessage" />
  </fieldset>
</template>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-control > label {
  font-weight: 700;
}
</style>
