import type { Nullable } from '@daria/shared';
import styles from './TextInput.module.css';
import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLInputElement> & {
  value: Nullable<string>;
  id: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  type?: string;
};

export const TextInput = ({
  leftElement,
  rightElement,
  value,
  onChange,
  type = 'text',
  ...props
}: Props) => {
  return (
    <div
      className={clsx(styles.textInput, {
        [styles.left]: !!leftElement,
        [styles.right]: !!rightElement
      })}
    >
      {leftElement}

      <input {...props} type={type} value={value ?? ''} onChange={onChange} />

      {rightElement}
    </div>
  );
};
