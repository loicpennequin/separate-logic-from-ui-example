import { ErrorKinds, LoginDto } from '@daria/shared';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { TextInput } from '../ui/TextInput/TextInput';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ButtonCta } from '../ui/Button/Cta/Cta';
import { FormFooter } from '../ui/form/Footer/Footer';
import { ButtonLink } from '../ui/Button/Link/Link';
import { FormError } from '../ui/form/Error/Error';
import { PasswordInput } from '../ui/PasswordInput/PasswordInput';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const { mutate: login, error } = useLogin();

  const initialValues = {
    email: '',
    password: ''
  };

  const { mutate: sendVerificationEmail } = useSendVerificationEmail();
  const isVerificationLinkDisplayed =
    error?.data?.kind === ErrorKinds.EMAIL_NOT_VERIFIED;

  return (
    <Formik
      validationSchema={toFormikValidationSchema(LoginDto)}
      onSubmit={values => {
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
            {fieldProps => <PasswordInput {...fieldProps} />}
          </FormControl>

          <FormFooter>
            <ButtonCta type="submit">Login</ButtonCta>
            <ButtonLink to="/lost-password">Forgot your password ?</ButtonLink>
          </FormFooter>

          {error && (
            <div className={styles.error}>
              <FormError error={error.message} />
              {isVerificationLinkDisplayed && (
                <ButtonLink
                  type="button"
                  onClick={() => sendVerificationEmail(props.values.email)}
                >
                  Resend confirmation email
                </ButtonLink>
              )}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
