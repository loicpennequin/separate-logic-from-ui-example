import { PageTitle } from '@/components/PageTitle/PageTitle';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';
import styles from './index.module.css';

export default function HomePage() {
  return (
    <Container className="page" size="md">
      <Surface>
        <PageTitle>Home Page</PageTitle>
        <section className={styles.inner}>
          <h3>What is this ?</h3>
          <p>
            This is an example app demonstrating how to separate your core
            business logic from your UI. It uses a shared package to handle all
            communication with the back end.
          </p>
          <h3>What is the underlying tech stack ?</h3>
          The app handle communication with the backend using{' '}
          <a href="https://trpc.io/" target="_blank" rel="noreferrer">
            tRPC
          </a>
          . The ORM used is{' '}
          <a href="https://www.prisma.io/" target="_blank" rel="noreferrer">
            Prisma
          </a>
          . All of this is completely hidden from the front end app code as
          everything is handled by the shared package.
          <h3>Which client version is this ?</h3>
          <p>
            You are currently viewing the{' '}
            <a
              href="https://beta.reactjs.org/"
              target="_blank"
              rel="noreferrer"
            >
              React version.
            </a>
          </p>
          <h3>Which features does this app have ?</h3>
          <p>
            This app handle the standard email-password authentication workflow,
            with :
          </p>
          <ul>
            <li>User sign up</li>
            <li>User Login</li>
            <li>Silent session refresh</li>
            <li>Password recovery</li>
          </ul>
        </section>
      </Surface>
    </Container>
  );
}
