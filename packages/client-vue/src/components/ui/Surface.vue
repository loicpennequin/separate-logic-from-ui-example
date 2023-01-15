<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), { as: 'div' });
</script>

<template>
  <component :is="props.as" class="surface">
    <slot />
  </component>
</template>

<style scoped lang="postcss">
.surface {
  background-color: var(--color-surface);
  padding: var(--space-8);
  border-radius: var(--radius-3);
  color: var(--color-on-surface);
}
</style>
