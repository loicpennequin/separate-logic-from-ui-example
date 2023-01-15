<script setup lang="ts">
useAuthGuard();
</script>

<template>
  <div class="layout">
    <AppHeader class="header" />
    <main><router-view /></main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
