import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './Icon.module.css';
import clsx from 'clsx';
import { ButtonBase } from '../Base/Base';

type Props = HTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
};

export const ButtonIcon: FC<PropsWithChildren<Props>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ButtonBase className={clsx(styles.buttonIcon, className)} {...props}>
      {children}
    </ButtonBase>
  );
};
