<template>
  <form class="form" novalidate>
    <slot />
  </form>
</template>

<style scoped>
.form {
  container-type: inline-size;
}

:slotted(.form > footer) {
  margin-block-start: var(--space-5);
}
</style>
