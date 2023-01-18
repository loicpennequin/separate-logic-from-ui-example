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
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { TosModal } from '../TosModal/TosModal';

const FormSchema = SignUpDto.extend({
  passwordConfirm: z.string(),
  isTosAccepted: z.boolean()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm']
});
type FormSchema = z.infer<typeof FormSchema>;

export const SignupForm = () => {
  const [isTosModalOpened, setIsTosModalOpened] = useState(false);
  const { mutate: signup, error } = useSignup();

  const initialValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    isTosAccepted: false
  };

  const { data: featureFlags } = useFeatureFlags();

  return (
    <>
      <TosModal
        isOpened={isTosModalOpened}
        onChange={val => setIsTosModalOpened(val)}
      />

      <Formik
        validationSchema={toFormikValidationSchema(FormSchema)}
        onSubmit={values => {
          signup({
            ...values,
            tosAcceptedAt: values.isTosAccepted ? new Date() : undefined
          });
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

            {featureFlags?.ACCEPT_TOS_ON_SIGNUP && (
              <FormControl id="signup-tos-accepted" name="isTosAccepted">
                {fieldProps => (
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" {...fieldProps} />I accept the
                    <ButtonLink
                      onClick={() => setIsTosModalOpened(true)}
                      type="button"
                    >
                      Terms and conditions
                    </ButtonLink>
                  </label>
                )}
              </FormControl>
            )}

            <FormFooter>
              <ButtonCta type="submit">Sign up</ButtonCta>
              <ButtonLink to="/login">I don&apos;t have an account</ButtonLink>
            </FormFooter>

            {error && <FormError error={error.message} />}
          </Form>
        )}
      </Formik>
    </>
  );
};
