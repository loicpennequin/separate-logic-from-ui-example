import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './Cta.module.css';
import clsx from 'clsx';
import { ButtonFull, type ButtonFullVariant } from '../Full/Full';

type Props = HTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  disabled?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  variant?: ButtonFullVariant;
};

export const ButtonCta: FC<PropsWithChildren<Props>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ButtonFull className={clsx(styles.buttonCta, className)} {...props}>
      {children}
    </ButtonFull>
  );
};
