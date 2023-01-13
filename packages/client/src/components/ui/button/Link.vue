<template>
  <UiButtonBase class="button-link">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>

<style scoped>
.button-link {
  color: var(--color-primary);
  text-decoration: underline;
  padding: 0;
  font-weight: 400;
  display: inline-flex;
}

.button-link:hover {
  color: var(--color-primary-dark);
}
.button-link:focus-visible {
  color: var(--color-primary-darker);
}
</style>
