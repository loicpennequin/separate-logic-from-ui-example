<script setup lang="ts">
import { authService } from './api/auth';

const { data: session } = useSession();
const { mutate: logout } = useLogout();

const router = useRouter();
router.beforeEach((to, from, next) => {
  if (!to.meta.needsAuth) return next();

  const jwt = authService.token;
  if (!jwt) return next('/login');

  return next();
});
</script>

<template>
  <div class="layout">
    <header style="display: flex; gap: 1em; align-items: center">
      <router-link to="/">
        <h1>My App</h1>
      </router-link>

      <p>Hello, {{ session?.email ?? 'Anonymous' }}</p>

      <template v-if="session">
        <button @click="logout(undefined)">Logout</button>
        <router-link to="/protected">Protected route</router-link>
      </template>
      <router-link v-else to="/login">Login</router-link>
    </header>
    <main><router-view /></main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
</style>
