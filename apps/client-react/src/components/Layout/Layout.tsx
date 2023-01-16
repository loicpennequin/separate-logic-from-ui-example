import type { ReactNode } from 'react';
import styles from './Layout.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => (
  <div className={styles.layout}>
    <AppHeader className={styles.header} />
    <main>{children}</main>
    <AppFooter />
  </div>
);
