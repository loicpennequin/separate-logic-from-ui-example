<script setup lang="ts">
import { useVerifyEmail } from '@/composables/user';
import { isString } from '@daria/shared';

const route = useRoute();
const { isLoading, error, isSuccess, mutate: verifyEmail } = useVerifyEmail();

onMounted(() => {
  if (isString(route.query.token)) verifyEmail(route.query.token);
});
</script>

<template>
  <UiCenter>
    <UiSurface>
      <p v-if="!isString(route.query.token) || error">
        We are not able to verify your email account. Did you arrive on this
        page by clicking the link in your signup confirmation email ?
      </p>
      <p v-else-if="isLoading">Verifying your email...</p>
      <p v-else-if="isSuccess">Your account if now verified.</p>
    </UiSurface>
  </UiCenter>
</template>
