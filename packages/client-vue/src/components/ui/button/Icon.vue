<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <UiButtonBase class="button-icon" :title="props.title">
    <slot />
  </UiButtonBase>
</template>

<style scoped>
.button-icon {
  padding: 0;
  height: 1.2em;
  aspect-ratio: 1;
}
</style>
