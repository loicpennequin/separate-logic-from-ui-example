<template>
  <UiButtonBase class="button-full">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>

<style scoped>
.button-full {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
.button-full:hover {
  background-color: var(--color-primary-dark);
  color: var(--color-on-primary-dark);
}
.button-full:focus {
  background-color: var(--color-primary-darker);
  color: var(--color-on-primary-darker);
}
</style>
