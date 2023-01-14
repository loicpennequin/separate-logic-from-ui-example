import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from '../Button/Icon/Icon';
import { TextInput } from '../TextInput/TextInput';
import EyeIcon from '~icons/mdi/eye';
import EyeOffIcon from '~icons/mdi/eye-off';
import type { Nullable } from '@daria/shared';

type Props = HTMLAttributes<HTMLInputElement> & {
  value: Nullable<string>;
  id: string;
  leftElement?: ReactNode;
  type: never;
};

export const PasswordInput = (props: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const type = isPasswordShown ? 'text' : 'password';
  const toggle = () => setIsPasswordShown(shown => !shown);

  const IconComponent = useMemo(
    () => (isPasswordShown ? EyeOffIcon : EyeIcon),
    [isPasswordShown]
  );

  return (
    <TextInput
      {...props}
      type={type}
      rightElement={
        <ButtonIcon
          type="button"
          title={isPasswordShown ? 'hide password' : 'show password'}
          onClick={toggle}
        >
          <IconComponent />
        </ButtonIcon>
      }
    />
  );
};
