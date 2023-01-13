<template>
  <UiContainer size="md" class="signup-page">
    <UiSurface as="section">
      <AppPageTitle>Create a new account</AppPageTitle>
      <UserSignupForm />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.signup-page {
  margin-block-start: var(--space-15);
}
</style>

<route lang="json">
{ "name": "SignUp", "meta": { "publicOnly": true } }
</route>
