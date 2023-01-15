import { SignUpDto } from '@daria/shared';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { TextInput } from '../ui/TextInput/TextInput';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ButtonCta } from '../ui/Button/Cta/Cta';
import { FormFooter } from '../ui/form/Footer/Footer';
import { ButtonLink } from '../ui/Button/Link/Link';
import { FormError } from '../ui/form/Error/Error';
import z from 'zod';
import { PasswordInput } from '../ui/PasswordInput/PasswordInput';

const FormSchema = SignUpDto.extend({
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm']
});
type FormSchema = z.infer<typeof FormSchema>;

export const SignupForm = () => {
  const { mutate: signup, error } = useSignup();

  const initialValues = {
    email: '',
    password: '',
    passwordConfirm: ''
  };

  return (
    <Formik
      validationSchema={toFormikValidationSchema(FormSchema)}
      onSubmit={values => {
        console.log(values);
        signup(values);
      }}
      initialValues={initialValues}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <FormControl id="signup-mail" name="email" label="E-mail">
            {fieldProps => <TextInput {...fieldProps} />}
          </FormControl>

          <FormControl id="signup-password" name="password" label="Password">
            {fieldProps => <PasswordInput {...fieldProps} />}
          </FormControl>

          <FormControl
            id="signup-password-confirm"
            name="passwordConfirm"
            label="Confirm your password"
          >
            {fieldProps => <PasswordInput {...fieldProps} />}
          </FormControl>

          <FormFooter>
            <ButtonCta type="submit">Sign up</ButtonCta>
            <ButtonLink to="/login">I don&apos;t have an account</ButtonLink>
          </FormFooter>

          {error && <FormError error={error.message} />}
        </Form>
      )}
    </Formik>
  );
};
