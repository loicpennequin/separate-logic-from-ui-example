<script setup lang="ts">
import IconLogo from '~icons/vscode-icons/file-type-vue';
const { data: session } = useSession();
const { mutate: logout } = useLogout();
</script>

<template>
  <header>
    <UiContainer class="inner">
      <router-link to="/" class="home-link">
        <IconLogo />
        <h1>My App</h1>
      </router-link>

      <nav>
        <ul>
          <template v-if="session">
            <li>
              <button @click="logout(undefined)">Logout</button>
            </li>
            <li>
              <router-link to="/protected">Protected route</router-link>
            </li>
          </template>

          <template v-else>
            <li>
              <router-link to="/login">Login</router-link>
            </li>
            <li>
              <router-link to="/signup">Sign up</router-link>
            </li>
          </template>
        </ul>
      </nav>
    </UiContainer>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  padding: var(--space-5);
}

.home-link {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}
.inner {
  justify-content: space-between;
}

.inner,
nav > ul {
  display: flex;
  gap: 1em;
  align-items: center;
}
</style>
