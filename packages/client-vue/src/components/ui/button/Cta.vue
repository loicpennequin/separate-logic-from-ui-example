<template>
  <UiButtonFull class="button-cta">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonFull>
</template>

<style scoped>
.button-cta {
  min-width: 12rem;
}
</style>
