import type { ReactNode } from 'react';
import styles from './Layout.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import { TosModal } from '../TosModal/TosModal';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => (
  <div className={styles.layout}>
    <TosModal />
    <AppHeader className={styles.header} />
    <main>{children}</main>
    <AppFooter />
  </div>
);
