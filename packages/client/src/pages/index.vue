<script setup lang="ts">
const { data: session } = useSession();
const { mutate: logout } = useLogout();
</script>

<template>
  <template v-if="session">
    Hello, {{ session.email }}
    <button @click="logout(undefined)">Logout</button>
  </template>
  <AuthLoginForm v-else />
</template>

<route lang="json">
{ "name": "Home" }
</route>
