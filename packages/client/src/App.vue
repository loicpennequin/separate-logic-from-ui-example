<script setup lang="ts">
useAuthGuard();
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main><router-view /></main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
</style>
