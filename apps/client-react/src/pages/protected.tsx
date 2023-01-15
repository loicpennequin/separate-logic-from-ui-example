import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <Container className="page">
        <Surface>
          <p>
            This is a protected page. You can only access it if you&apos;re
            logged in
          </p>
        </Surface>
      </Container>
    </ProtectedRoute>
  );
}
