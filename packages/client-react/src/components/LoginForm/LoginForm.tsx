import { LoginDto } from '@daria/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { TextInput } from '../ui/TextInput/TextInput';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ButtonBase } from '../ui/Button/Base/Base';

export const LoginForm = () => {
  const { mutate: login, isLoading, error, reset } = useLogin();

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

          <ButtonBase>Login</ButtonBase>
        </Form>
      )}
    </Formik>
  );
};
