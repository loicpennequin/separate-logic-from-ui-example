<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { SignUpDto } from '@daria/shared';
import { z } from 'zod';

const { push } = useRouter();
const {
  mutate: login,
  isLoading,
  reset
} = useSignup({
  onSuccess() {
    push({ name: 'Home' });
  }
});

const FormSchema = SignUpDto.extend({
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm']
});
type FormSchema = z.infer<typeof FormSchema>;

const { handleSubmit } = useForm<FormSchema>({
  validationSchema: toFormValidator(FormSchema),
  initialValues: {
    email: '',
    password: '',
    passwordConfirm: ''
  }
});

const onSubmit = handleSubmit(values => {
  reset();
  login(values);
});
</script>

<template>
  <form space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="signup-mail"
      v-slot="{ on, bind }"
      name="email"
      label="E-mail"
    >
      <UiTextInput v-bind="bind" type="email" v-on="on" />
    </UiFormControl>

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

    <UiButtonFull :is-loading="isLoading">Sign up</UiButtonFull>
  </form>
</template>

<style scoped></style>
