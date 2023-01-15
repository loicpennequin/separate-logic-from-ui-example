import type { HTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './surface.module.css';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: string;
};

export const Surface: FC<PropsWithChildren<Props>> = ({
  children,
  as = 'div',
  className,
  ...props
}) => {
  const Component = as as unknown as FC<
    PropsWithChildren<HTMLAttributes<HTMLDivElement>>
  >;

  return (
    <Component className={clsx(className, styles.surface)} {...props}>
      {children}
    </Component>
  );
};
