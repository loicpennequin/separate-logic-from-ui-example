import { PageTitle } from '@/components/PageTitle/PageTitle';
import { Container } from '@/components/ui/Container/Container';
import { Surface } from '@/components/ui/Surface/Surface';

export default function HomePage() {
  return (
    <Container className="page" size="md">
      <Surface>
        <PageTitle>Home Page</PageTitle>
      </Surface>
    </Container>
  );
}
