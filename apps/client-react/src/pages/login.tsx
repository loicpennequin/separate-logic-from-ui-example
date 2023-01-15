import { LoginForm } from '@/components/LoginForm/LoginForm';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { PublicOnlyRoute } from '@/components/PublicOnlyRoute';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';

export default function HomePage() {
  return (
    <PublicOnlyRoute>
      <Container className="page" size="md">
        <Surface as="section">
          <PageTitle>Login to your account</PageTitle>
          <LoginForm />
        </Surface>
      </Container>
    </PublicOnlyRoute>
  );
}
