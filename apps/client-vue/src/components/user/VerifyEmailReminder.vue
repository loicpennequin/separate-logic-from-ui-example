<script setup lang="ts">
import { EmailVerificationModes } from '@daria/shared';

const { data: session } = useSession();
const { data: featureFlags } = useFeatureFlags();
const { mutate: resendEmail, isSuccess } = useSendVerificationEmail();

const isDisplayed = computed(
  () =>
    session.value &&
    !session.value.verifiedAt &&
    featureFlags.value?.EMAIL_VERIFICATION_ON_SIGNUP ===
      EmailVerificationModes.REMINDER
);
</script>

<template>
  <transition appear>
    <div role="alert" class="verify-email-reminder" v-if="isDisplayed">
      You have not verified your account yet.
      <UiButtonLink @click="resendEmail(session!.email)">
        Resend e-mail
      </UiButtonLink>

      <span v-if="isSuccess">
        Email sent successfully. If you can't find it, please check your spam
        folder.
      </span>
    </div>
  </transition>
</template>

<style scoped>
.verify-email-reminder {
  background-color: var(--color-warning);
  padding: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.v-enter-active,
.v-leave-active {
  transition: all var(--transition-md);
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
}
</style>
