<template>
  <UiContainer size="md" class="signup-page">
    <UiSurface as="section">
      <h2 class="page-title">Create a new account</h2>
      <UserSignupForm />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.signup-page {
  margin-block-start: var(--space-15);
}
.page-title {
  text-align: center;
  font-size: var(--text-size-6);
  font-weight: 700;
  margin-block-end: var(--space-8);
}
</style>

<route lang="json">
{ "name": "SignUp", "meta": { "publicOnly": true } }
</route>
