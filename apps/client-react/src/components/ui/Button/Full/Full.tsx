import type {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode
} from 'react';
import { ButtonBase } from '@/components/ui/Button/Base/Base';
import styles from './Full.module.css';
import clsx from 'clsx';

export type ButtonFullVariant = 'primary' | 'error';

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

export const ButtonFull: FC<PropsWithChildren<Props>> = ({
  className,
  children,
  variant = 'primary',
  ...props
}) => {
  const style = {
    '--button-full-bg': `var(--color-${variant})`,
    ['--button-full-bgHover']: `var(--color-${variant}-dark)`,
    ['--button-full-bgFocus']: `var(--color-${variant}-darker)`,
    ['--button-full-text']: `var(--color-on-${variant})`,
    ['--button-full-textHover']: `var(--color-on-${variant}-dark)`,
    ['--button-full-textFocus']: `var(--color-on-${variant}-darker)`
  } as CSSProperties;

  return (
    <ButtonBase
      className={clsx(styles.buttonFull, className)}
      style={style}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};
