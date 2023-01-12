<script setup lang="ts">
const props = defineProps<{ name: string; id: string; label: string }>();
const { value } = useField(toRef(props, 'name'));

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
  <div>
    <label v-if="props.label" :for="props.id">
      {{ props.label }}
    </label>
    <slot :bind="bind" :on="on" />
  </div>
</template>
