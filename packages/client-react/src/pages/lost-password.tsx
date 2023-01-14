import { LostPasswordForm } from '@/components/LostPasswordForm/LostPasswordForm';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { PublicOnlyRoute } from '@/components/PublicOnlyRoute';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';

export default function LostPasswordPage() {
  return (
    <PublicOnlyRoute>
      <Container className="page" size="sm">
        <Surface as="section">
          <PageTitle>Lost your password?</PageTitle>
          <p>
            Please fill the form below. We will send you an e-mail containing a
            link to select a new password.
          </p>
          <LostPasswordForm />
        </Surface>
      </Container>
    </PublicOnlyRoute>
  );
}
