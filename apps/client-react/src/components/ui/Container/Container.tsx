import type { HTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './Container.module.css';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  size = 'xl',
  as = 'div',
  className,
  ...props
}) => {
  const style = {
    '--container-max-width': `var(--breakpoints-${size})`
  } as React.CSSProperties;

  const Component = as as unknown as FC<
    PropsWithChildren<HTMLAttributes<HTMLDivElement>>
  >;

  return (
    <Component
      className={clsx(className, styles.container)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
