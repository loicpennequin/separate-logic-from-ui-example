import { ResetPasswordDto } from '@daria/shared';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ButtonCta } from '../ui/Button/Cta/Cta';
import { FormFooter } from '../ui/form/Footer/Footer';
import { FormError } from '../ui/form/Error/Error';
import styles from './ResetPasswordForm.module.css';
import z from 'zod';
import { PasswordInput } from '../ui/PasswordInput/PasswordInput';
import { ButtonLink } from '../ui/Button/Link/Link';

const FormSchema = ResetPasswordDto.extend({
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm']
});
type FormSchema = z.infer<typeof FormSchema>;

type Props = { token: string };
export const ResetPasswordForm = ({ token }: Props) => {
  const { mutate: resetPassword, error, reset, isSuccess } = useResetPassword();

  const initialValues = {
    token,
    password: '',
    passwordConfirm: ''
  };

  return (
    <Formik
      validationSchema={toFormikValidationSchema(FormSchema)}
      onSubmit={values => {
        reset();
        resetPassword(values);
      }}
      initialValues={initialValues}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <FormControl
            id="new-password"
            name="password"
            label="Your new Password"
          >
            {fieldProps => <PasswordInput {...fieldProps} />}
          </FormControl>

          <FormControl
            id="new-password-confirm"
            name="passwordConfirm"
            label="Confirm your new password"
          >
            {fieldProps => <PasswordInput {...fieldProps} />}
          </FormControl>

          <FormFooter>
            <ButtonCta type="submit">Send password reset email</ButtonCta>
          </FormFooter>

          {error && <FormError error={error.message} />}

          {isSuccess && (
            <p className={styles.successMessage}>
              Password changed successfully. you can now
              <ButtonLink to="/login">login to your account</ButtonLink>
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};
