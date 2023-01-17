<script setup lang="ts">
const props = withDefaults(defineProps<{ variant?: 'primary' | 'error' }>(), {
  variant: 'primary'
});

const colors = computed(() => ({
  bg: `var(--color-${props.variant})`,
  bgHover: `var(--color-${props.variant}-dark)`,
  bgFocus: `var(--color-${props.variant}-darker)`,
  text: `var(--color-on-${props.variant})`,
  textHover: `var(--color-on-${props.variant}-dark)`,
  textFocus: `var(--color-on-${props.variant}-darker)`
}));
</script>

<template>
  <UiButtonBase class="button-full">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>

<style scoped>
.button-full {
  background-color: v-bind('colors.bg');
  color: v-bind('colors.text');
}
.button-full:hover {
  background-color: v-bind('colors.bgHover');
  color: v-bind('colors.textHover');
}
.button-full:focus-visible {
  background-color: v-bind('colors.bgFocus');
  color: v-bind('colors.textFocus');
}
</style>
