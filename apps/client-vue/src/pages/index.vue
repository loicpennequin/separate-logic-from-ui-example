<template>
  <UiContainer class="home-page" size="md">
    <UiSurface>
      <AppPageTitle>My App</AppPageTitle>

      <section>
        <h3>What is this ?</h3>
        <p>
          This is an example app demonstrating how to separate your core
          business logic from your UI. It uses a shared package to handle all
          communication with the back end.
        </p>
        <h3>What is the underlying tech stack ?</h3>
        The app handle communication with the backend using
        <a href="https://trpc.io/" target="_blank" rel="noreferrer">tRPC</a>
        . The ORM used is
        <a href="https://www.prisma.io/" target="_blank" rel="noreferrer">
          Prisma
        </a>
        . All of this is completely hidden from the front end app code as
        everything is handled by the shared package.
        <h3>Which client version is this ?</h3>
        <p>
          You are currently viewing the
          <a href="https://vuejs.org/" target="_blank" rel="noreferrer">
            Vue 3 version.
          </a>
        </p>
        <h3>Which features does this app have ?</h3>
        <p>
          This app handle the standard email-password authentication workflow,
          with :
        </p>
        <ul>
          <li>User sign up</li>
          <li>User Login</li>
          <li>Silent session refresh</li>
          <li>Password recovery</li>
        </ul>
      </section>
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.home-page {
  margin-block-start: var(--space-15);
}

section {
  line-height: 1.5;
}

section > * + * {
  margin-top: var(--space-4);
}

section > h3 {
  font-weight: 700;
  font-size: var(--text-size-4);
}

section > ul {
  list-style-type: disc;
  padding-left: var(--space-6);
}

section a {
  color: var(--color-primary);
  font-weight: 700;
  text-decoration: underline;
}
</style>

<route lang="json">
{ "name": "Home" }
</route>
