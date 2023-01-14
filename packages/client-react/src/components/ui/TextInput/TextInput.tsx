import type { Nullable } from '@daria/shared';
import styles from './TextInput.module.css';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  value: Nullable<string>;
  onChange: (val: string) => void;
  name: string;
  type?: string;
  id: string;
  disabled?: boolean;
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

      <input
        {...props}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
      />

      {rightElement}
    </div>
  );
};
