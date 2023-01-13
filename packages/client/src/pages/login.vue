<template>
  <UiContainer size="md" class="login-page">
    <UiSurface as="section">
      <h2 class="page-title">Sign in to your account</h2>
      <AuthLoginForm />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.login-page {
  margin-block: var(--space-8);
}

.page-title {
  text-align: center;
  font-size: var(--text-size-6);
  font-weight: 700;
  margin-block-end: var(--space-8);
}
</style>

<route lang="json">
{ "name": "Login", "meta": { "publicOnly": true } }
</route>
