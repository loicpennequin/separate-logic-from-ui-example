<script setup lang="ts">
import { isString } from '@daria/shared';

const route = useRoute();
</script>
<template>
  <UiContainer size="sm" class="reset-password-page">
    <UiSurface as="section">
      <AppPageTitle>Reset your password</AppPageTitle>
      <router-link v-if="!isString(route.query.token)" to="/lost-password">
        Click here to request a password reset email
      </router-link>

      <UserResetPasswordForm v-else :token="route.query.token" />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.reset-password-page {
  margin-block-start: var(--space-15);
}
</style>

<route lang="json">
{ "name": "ResetPassword", "meta": { "publicOnly": true } }
</route>
