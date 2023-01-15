import { PageTitle } from '@/components/PageTitle/PageTitle';
import { PublicOnlyRoute } from '@/components/PublicOnlyRoute';
import { ResetPasswordForm } from '@/components/ResetPasswordForm/ResetPasswormForm';
import { ButtonLink } from '@/components/ui/Button/Link/Link';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';
import { useSearchParams } from 'react-router-dom';

export default function LostPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <PublicOnlyRoute>
      <Container className="page" size="sm">
        <Surface as="section">
          <PageTitle>Reset your password</PageTitle>
          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <ButtonLink to="/lost-password">
              Click here to request a password reset email
            </ButtonLink>
          )}
        </Surface>
      </Container>
    </PublicOnlyRoute>
  );
}
