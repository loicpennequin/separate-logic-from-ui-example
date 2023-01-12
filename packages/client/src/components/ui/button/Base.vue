<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
  }>(),
  {
    isLoading: false
  }
);
const attrs = useAttrs();
const is = computed(() => (attrs.to ? RouterLink : 'button'));
</script>

<template>
  <component
    :is="is"
    class="button-base"
    :disabled="isLoading || $attrs.disabled"
  >
    <slot name="left" />

    <!-- <UiSpinner v-if="isLoading" /> -->
    <span v-if="isLoading">Loading...</span>
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
  padding-inline: var(--space-4);
  padding-block: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: var(--radius-2);
  border: solid 1 transparent;
}

.button-base:focus {
  outline: solid 1px var(--color-primary);
}

.button-base:disabled {
  opacity: 0.6;
}
</style>
