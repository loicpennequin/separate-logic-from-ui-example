import type { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { clsx } from 'clsx';
import { Container } from '../ui/Container/Container';
import IconLogo from '~icons/vscode-icons/file-type-reactjs';

type Props = HTMLAttributes<HTMLElement>;

export const AppHeader = ({ className, ...props }: Props) => {
  const { data: session } = useSession();
  const { mutate: logout } = useLogout();

  return (
    <header {...props} className={clsx(styles.appHeader, className)}>
      <Container className={styles.inner}>
        <Link to="/" className={styles.homeLink}>
          <IconLogo />
          <h1>My App</h1>
        </Link>

        <nav>
          <ul>
            {session ? (
              <>
                <li>
                  <button onClick={() => logout(undefined)}>Logout</button>
                </li>
                <li>
                  <Link to="/protected">Protected route</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
