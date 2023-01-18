import type { FC, PropsWithChildren } from 'react';
import styles from './Center.module.css';

export const Center: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.center}>{children}</div>
);
