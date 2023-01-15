<template>
  <p>This is a protected page. You can only access it if you're logged in</p>
</template>

<route lang="json">
{
  "meta": {
    "needsAuth": true
  }
}
</route>
