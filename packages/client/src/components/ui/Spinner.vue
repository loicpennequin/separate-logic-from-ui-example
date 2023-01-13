<script setup lang="ts">
import IconSpinner from '~icons/el/spinner-3';
</script>

<template>
  <div class="wrapper" style="--animate-duration: 4s">
    <IconSpinner class="spinner" />
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  --spinner-size: 3rem;
}
.spinner {
  font-size: var(--spinner-size);
  aspect-ratio: 1;
  min-height: 1em;
}
</style>
