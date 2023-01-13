<script setup lang="ts">
import IconAlert from '~icons/mdi/alert';
const props = defineProps<{ error?: string }>();
</script>

<template>
  <transition appear>
    <div class="form-error">
      <IconAlert />
      {{ props.error }}
    </div>
  </transition>
</template>

<style scoped>
.form-error {
  color: var(--color-error);
  display: flex;
  gap: var(--space-2);
}

.v-enter-active,
.v-leave-active {
  transition: opacity var(--transition-sm);
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
