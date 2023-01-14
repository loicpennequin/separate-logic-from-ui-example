import type { Nullable } from '@daria/shared';
import styles from './TextInput.module.css';
import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLInputElement> & {
  value: Nullable<string>;
  id: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export const TextInput = ({
  leftElement,
  rightElement,
  value,
  onChange,
  ...props
}: Props) => {
  return (
    <div
      className={clsx(styles.textInput, {
        left: !!leftElement,
        right: !!rightElement
      })}
    >
      {leftElement}

      <input {...props} value={value ?? ''} onChange={onChange} />

      {rightElement}
    </div>
  );
};
