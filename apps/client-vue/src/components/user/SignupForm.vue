<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { SignUpDto } from '@daria/shared';
import { z } from 'zod';

const { push } = useRouter();
const {
  mutate: signup,
  isLoading,
  error
} = useSignup({
  onSuccess() {
    push({ name: 'Home' });
  }
});

const FormSchema = SignUpDto.extend({
  passwordConfirm: z.string(),
  isTosAccepted: z.boolean()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm']
});
type FormSchema = z.infer<typeof FormSchema>;

const { data: featureFlags } = useFeatureFlags();
const { handleSubmit } = useForm<FormSchema>({
  validationSchema: toFormValidator(FormSchema),
  initialValues: {
    email: '',
    password: '',
    passwordConfirm: '',
    isTosAccepted: false
  }
});

const isTosModalOpened = ref(false);

const onSubmit = handleSubmit(values => {
  signup({
    ...values,
    tosAcceptedAt: values.isTosAccepted ? new Date() : undefined
  });
});
</script>

<template>
  <UiForm @submit.prevent="onSubmit" class="signup-form">
    <AppToSModal v-model:is-opened="isTosModalOpened" is-controlled />

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

    <UiFormControl
      v-if="featureFlags?.ACCEPT_TOS_ON_SIGNUP"
      id="signup-tos-accepted-at"
      v-slot="{ bind, on }"
      name="isTosAccepted"
    >
      <UiCheckbox type="checkbox" v-bind="bind" v-on="on">
        I accept the
        <UiButtonLink @click="isTosModalOpened = true" type="button">
          terms and conditions
        </UiButtonLink>
      </UiCheckbox>
    </UiFormControl>

    <UiFormFooter>
      <UiButtonCta :is-loading="isLoading">Sign up</UiButtonCta>
      <UiButtonLink to="/login">I don't have an account</UiButtonLink>
    </UiFormFooter>

    <UiFormError :error="error.message" v-if="error" />
  </UiForm>
</template>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
