import { PageTitle } from '@/components/PageTitle/PageTitle';
import { PublicOnlyRoute } from '@/components/PublicOnlyRoute';
import { SignupForm } from '@/components/SignupForm/Signupform';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';

export default function HomePage() {
  return (
    <PublicOnlyRoute>
      <Container className="page" size="md">
        <Surface as="section">
          <PageTitle>Create a new account</PageTitle>
          <SignupForm />
        </Surface>
      </Container>
    </PublicOnlyRoute>
  );
}
