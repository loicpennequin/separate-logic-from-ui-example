<script setup lang="ts">
import { authService } from './api/auth';

const router = useRouter();
router.beforeEach((to, from, next) => {
  if (!to.meta.needsAuth) return next();

  const jwt = authService.token;
  if (!jwt) return next('/');

  return next();
});
</script>

<template>
  <div class="layout">
    <main><router-view /></main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
</style>
