import { SendPasswordResetEmailDto } from '@daria/shared';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { TextInput } from '../ui/TextInput/TextInput';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ButtonCta } from '../ui/Button/Cta/Cta';
import { FormFooter } from '../ui/form/Footer/Footer';
import { FormError } from '../ui/form/Error/Error';
import styles from './LostPasswordForm.module.css';

export const LostPasswordForm = () => {
  const {
    mutate: sendPasswordEmail,
    error,
    reset,
    isSuccess
  } = useLostPassword();

  const initialValues = {
    email: ''
  };

  return (
    <Formik
      validationSchema={toFormikValidationSchema(SendPasswordResetEmailDto)}
      onSubmit={values => {
        reset();
        sendPasswordEmail(values);
      }}
      initialValues={initialValues}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <FormControl id="lost-password-email" name="email" label="E-mail">
            {fieldProps => <TextInput {...fieldProps} />}
          </FormControl>

          <FormFooter>
            <ButtonCta type="submit">Send password reset email</ButtonCta>
          </FormFooter>

          {error && <FormError error={error.message} />}

          {isSuccess && (
            <p className={styles.successMessage}>
              If an account with this e-mail address exists on our platform, an
              e-mail will be sent shortly (usually immediately).
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};
