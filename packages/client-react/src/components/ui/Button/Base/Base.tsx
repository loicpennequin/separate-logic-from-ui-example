import type {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode
} from 'react';
import { Link } from 'react-router-dom';
import styles from './Base.module.css';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  disabled?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export const ButtonBase: FC<PropsWithChildren<Props>> = ({
  isLoading,
  size = 'md',
  to,
  disabled,
  children,
  leftElement,
  rightElement,
  className,
  ...props
}) => {
  const Component = to ? Link : 'button';
  const sizeLookup = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  } as const;

  const style = {
    '--button-base-font-size': `var(--text-size-${sizeLookup[size]})`
  } as CSSProperties;

  return (
    <Component
      {...(props as any)}
      className={clsx(styles.buttonBase, className)}
      style={style}
      disabled={isLoading || disabled}
      to={to ?? ''}
    >
      {leftElement}

      {isLoading ? <span>Loading...</span> : children}

      {rightElement}
    </Component>
  );
};
