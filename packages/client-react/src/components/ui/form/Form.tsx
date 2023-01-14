import type { HTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './Form.module.css';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLFormElement>;

export const Form: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form className={clsx(className, styles.form)} {...props}>
      {children}
    </form>
  );
};
