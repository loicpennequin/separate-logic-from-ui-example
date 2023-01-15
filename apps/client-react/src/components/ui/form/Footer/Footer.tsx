import type { FC, PropsWithChildren } from 'react';
import styles from './Footer.module.css';

export const FormFooter: FC<PropsWithChildren> = ({ children }) => (
  <footer className={styles.formFooter}>{children}</footer>
);
