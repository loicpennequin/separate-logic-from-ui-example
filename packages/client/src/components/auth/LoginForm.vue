<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { LoginDto } from '@daria/shared';

const { push } = useRouter();
const { mutate: login, reset } = useLogin({
  onSuccess() {
    push({ name: 'Home' });
  }
});

const { handleSubmit } = useForm<LoginDto>({
  validationSchema: toFormValidator(LoginDto),
  initialValues: {
    email: '',
    password: ''
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

    <button>Login</button>
  </form>
</template>

<style scoped></style>
