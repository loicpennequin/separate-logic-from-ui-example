<script setup lang="ts">
import { SendPasswordResetEmailDto } from '@daria/shared';
import { toFormValidator } from '@vee-validate/zod';

const { mutate, error, isLoading, isSuccess } = useLostPassword();

const { handleSubmit } = useForm<SendPasswordResetEmailDto>({
  validationSchema: toFormValidator(SendPasswordResetEmailDto),
  initialValues: {
    email: ''
  }
});

const onSubmit = handleSubmit(values => {
  mutate(values);
});
</script>

<template>
  <UiForm @submit.prevent="onSubmit" class="signup-form">
    <UiFormControl
      id="signup-mail"
      v-slot="{ on, bind }"
      name="email"
      label="E-mail"
    >
      <UiTextInput v-bind="bind" type="email" v-on="on" />
    </UiFormControl>

    <UiFormFooter>
      <UiButtonCta :is-loading="isLoading">
        Send password reset email
      </UiButtonCta>
    </UiFormFooter>

    <UiFormError :error="error.message" v-if="error" />

    <p v-if="isSuccess">
      If an account with this e-mail address exists on our platform, an e-mail
      will be sent shortly (usually immediately).
    </p>
  </UiForm>
</template>

<style scoped>
p {
  font-weight: 700;
  margin-block: var(--space-5);
}
</style>
