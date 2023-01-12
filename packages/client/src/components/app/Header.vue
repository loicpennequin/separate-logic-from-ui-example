<script setup lang="ts">
const { data: session } = useSession();
const { mutate: logout } = useLogout();
</script>

<template>
  <header>
    <router-link to="/">
      <h1>My App</h1>
    </router-link>

    <p>Hello, {{ session?.email ?? 'Anonymous' }}</p>

    <template v-if="session">
      <button @click="logout(undefined)">Logout</button>
      <router-link to="/protected">Protected route</router-link>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign up</router-link>
    </template>
  </header>
</template>

<style scoped>
header {
  display: flex;
  gap: 1em;
  align-items: center;
}
</style>
