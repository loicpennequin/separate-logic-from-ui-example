<template>
  <UiContainer size="sm" class="lost-password-page">
    <UiSurface as="section">
      <AppPageTitle>Lost your password ?</AppPageTitle>
      <p>
        Please fill the form below. We will send you an e-mail containing a link
        to select a new password.
      </p>
      <UserLostPasswordForm />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.lost-password-page {
  margin-block-start: var(--space-15);
}

p {
  margin-block: var(--space-5);
}
</style>

<route lang="json">
{ "name": "LostPassword", "meta": { "publicOnly": true } }
</route>
