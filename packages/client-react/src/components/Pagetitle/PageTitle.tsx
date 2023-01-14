import type { FC, PropsWithChildren } from 'react';
import styles from './PageTitle.module.css';

export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className={styles.pageTitle}>{children}</h2>;
};
