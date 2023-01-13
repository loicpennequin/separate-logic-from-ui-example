<script setup lang="ts">
const props = withDefaults(
  defineProps<{ as?: string; size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }>(),
  { as: 'div', size: 'xl' }
);

const maxWidth = computed(() => `var(--breakpoints-${props.size})`);
</script>

<template>
  <component :is="props.as" class="container"><slot /></component>
</template>

<style scoped>
.container {
  margin-inline: auto;
  width: 100%;
  max-width: v-bind(maxWidth);
}
</style>
