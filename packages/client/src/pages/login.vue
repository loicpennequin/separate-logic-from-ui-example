<template>
  <UiContainer size="md" class="login-page">
    <UiSurface as="section">
      <AppPageTitle class="page-title">Login to your account</AppPageTitle>
      <AuthLoginForm />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.login-page {
  margin-block-start: var(--space-15);
}
</style>

<route lang="json">
{ "name": "Login", "meta": { "publicOnly": true } }
</route>
