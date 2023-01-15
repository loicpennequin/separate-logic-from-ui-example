import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { ButtonBase } from '@/components/ui/Button/Base/Base';
import styles from './Full.module.css';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  disabled?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
};

export const ButtonFull: FC<PropsWithChildren<Props>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ButtonBase className={clsx(styles.buttonFull, className)} {...props}>
      {children}
    </ButtonBase>
  );
};
