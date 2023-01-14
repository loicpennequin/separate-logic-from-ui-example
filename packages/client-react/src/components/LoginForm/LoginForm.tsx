import { useForm, Controller } from 'react-hook-form';
import { LoginDto } from '@daria/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form/Form';
import { FormControl } from '../ui/form/Control/Control';
import { TextInput } from '../ui/TextInput/TextInput';

export const LoginForm = () => {
  const { mutate: login, isLoading, error, reset } = useLogin();

  const { control, handleSubmit } = useForm<LoginDto>({
    resolver: zodResolver(LoginDto)
  });

  const onSubmit = handleSubmit(values => {
    reset();
    login(values);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormControl id="signup-mail" name="email" label="E-mail">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput {...field} type="email" id="signup-mail" />
          )}
        />
      </FormControl>
    </Form>
  );
};
