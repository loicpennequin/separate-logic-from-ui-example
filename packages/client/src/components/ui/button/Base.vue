<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
  }>(),
  {
    isLoading: false,
    size: 'md'
  }
);
const attrs = useAttrs();
const is = computed(() => (attrs.to ? RouterLink : 'button'));

const fontSize = computed(() => {
  const lookup = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  } as const;

  return `var(--text-size-${lookup[props.size]})`;
});
</script>

<template>
  <component
    :is="is"
    class="button-base"
    :disabled="isLoading || $attrs.disabled"
  >
    <slot name="left" />

    <!-- <UiSpinner v-if="isLoading" /> -->
    <span v-if="props.isLoading">Loading...</span>
    <slot v-else />

    <slot name="right" />
  </component>
</template>

<style scoped>
.button-base {
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  font-size: v-bind(fontSize);
  padding-inline: var(--space-4-em);
  padding-block: var(--space-3-em);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: var(--radius-2);
  border: solid 1px transparent;
}

.button-base:focus {
  outline: solid 1px var(--color-primary);
}

.button-base:disabled {
  opacity: 0.6;
}
</style>
