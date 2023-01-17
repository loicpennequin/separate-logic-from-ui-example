<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { ErrorKinds, LoginDto } from '@daria/shared';

const { mutate: login, isLoading, error } = useLogin();

const { handleSubmit, values } = useForm<LoginDto>({
  validationSchema: toFormValidator(LoginDto)
});

const onSubmit = handleSubmit(values => {
  login(values);
});

const { mutate: sendVerificationEmail } = useSendVerificationEmail();
const isVerificationLinkDisplayed = computed(
  () => error.value?.data?.kind === ErrorKinds.EMAIL_NOT_VERIFIED
);
</script>

<template>
  <UiForm @submit.prevent="onSubmit" class="login-form">
    <UiFormControl
      id="login-mail"
      v-slot="{ on, bind }"
      name="email"
      label="E-mail"
    >
      <UiTextInput v-bind="bind" type="email" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="login-password"
      v-slot="{ bind, on }"
      name="password"
      label="Password"
    >
      <UiPasswordInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormFooter>
      <UiButtonCta :is-loading="isLoading">Login</UiButtonCta>
      <UiButtonLink to="/lost-password">Forgot your password ?</UiButtonLink>
    </UiFormFooter>

    <div class="error">
      <UiFormError :error="error.message" v-if="error" />
      <UiButtonLink
        type="button"
        v-if="isVerificationLinkDisplayed"
        @click="sendVerificationEmail(values.email)"
      >
        Resend confirmation email
      </UiButtonLink>
    </div>
  </UiForm>
</template>

<style scoped lang="postcss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.error {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
</style>
