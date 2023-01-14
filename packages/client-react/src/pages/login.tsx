import { PageTitle } from '@/components/Pagetitle/Pagetitle';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';

export default function HomePage() {
  return (
    <Container className="page" size="md">
      <Surface as="section">
        <PageTitle>Login to your account</PageTitle>
      </Surface>
    </Container>
  );
}
