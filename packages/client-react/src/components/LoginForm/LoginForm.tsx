import { LoginDto } from '@daria/shared';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { TextInput } from '../ui/TextInput/TextInput';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ButtonCta } from '../ui/Button/Cta/Cta';
import { FormFooter } from '../ui/form/Footer/Footer';
import { ButtonLink } from '../ui/Button/Link/Link';
import { FormError } from '../ui/form/Error/Error';

export const LoginForm = () => {
  const { mutate: login, error, reset } = useLogin();

  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <Formik
      validationSchema={toFormikValidationSchema(LoginDto)}
      onSubmit={values => {
        reset();
        login(values);
      }}
      initialValues={initialValues}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <FormControl id="signup-mail" name="email" label="E-mail">
            {fieldProps => <TextInput {...fieldProps} />}
          </FormControl>

          <FormControl id="signup-password" name="password" label="Password">
            {fieldProps => <TextInput {...fieldProps} />}
          </FormControl>

          <FormFooter>
            <ButtonCta>Login</ButtonCta>
            <ButtonLink to="/lost-password">Forgot your password</ButtonLink>
          </FormFooter>

          {error && <FormError error={error.message} />}
        </Form>
      )}
    </Formik>
  );
};
