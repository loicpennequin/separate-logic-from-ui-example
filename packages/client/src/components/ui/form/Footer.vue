<template>
  <footer class="form-footer">
    <slot />
  </footer>
</template>

<style scoped lang="postcss">
.form-footer {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
}

@container (max-width: 40rem) {
  .form-footer {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }
}
</style>
