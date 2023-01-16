import { Surface } from '../ui/Surface/Surface';
import styles from './AppFooter.module.css';

export const AppFooter = () => {
  return (
    <Surface as="footer" className={styles.appFooter}>
      Made with
      <span>💀</span>
      ❤️ by Daria aka &quot;CEO of based&quot;
    </Surface>
  );
};
