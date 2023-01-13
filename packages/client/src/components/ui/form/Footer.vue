<template>
  <footer class="form-footer">
    <slot />
  </footer>
</template>

<style scoped>
.form-footer {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
}
</style>
