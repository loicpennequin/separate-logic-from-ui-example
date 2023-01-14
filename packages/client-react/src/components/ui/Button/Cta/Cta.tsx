import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './Cta.module.css';
import clsx from 'clsx';
import { ButtonFull } from '../Full/Full';

type Props = HTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  disabled?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
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
