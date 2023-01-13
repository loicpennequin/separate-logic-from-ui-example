<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { ResetPasswordDto } from '@daria/shared';
import { z } from 'zod';

const props = defineProps<{ token: string }>();
const {
  mutate: login,
  isLoading,
  error,
  isSuccess
} = useResetPassword({
  onSuccess() {
    resetForm();
  }
});

const FormSchema = ResetPasswordDto.extend({
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm']
});
type FormSchema = z.infer<typeof FormSchema>;

const { handleSubmit, resetForm } = useForm<FormSchema>({
  validationSchema: toFormValidator(FormSchema),
  initialValues: {
    token: props.token,
    password: '',
    passwordConfirm: ''
  }
});

const onSubmit = handleSubmit(values => {
  login(values);
});
</script>

<template>
  <UiForm @submit.prevent="onSubmit" class="reset-password-form">
    <UiFormControl
      id="signup-password"
      v-slot="{ bind, on }"
      name="password"
      label="Password"
    >
      <UiPasswordInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signup-password-confirm"
      v-slot="{ bind, on }"
      name="passwordConfirm"
      label="Confirm your password"
    >
      <UiPasswordInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormFooter>
      <UiButtonCta :is-loading="isLoading">Reset password</UiButtonCta>
    </UiFormFooter>

    <UiFormError :error="error.message" v-if="error" />
    <p v-if="isSuccess">
      Password changed successfully. you can now
      <UiButtonLink to="/login">login to your account</UiButtonLink>
    </p>
  </UiForm>
</template>

<style scoped>
.reset-password-form-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

p {
  font-weight: 700;
  margin-block: var(--space-5);
  display: flex;
  align-items: center;
  gap: 0.25ch;
}
</style>
