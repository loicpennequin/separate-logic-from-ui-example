import { PageTitle } from '@/components/PageTitle/PageTitle';
import { Center } from '@/components/ui/Center/Center';
import { Surface } from '@/components/ui/Surface/Surface';

export default function SignupPage() {
  return (
    <Center>
      <Surface>
        <PageTitle>Almost there !</PageTitle>
        <p>
          A confirmation email has just been sent to the provided email address.
          Click the link inside it to verify your account.
        </p>
      </Surface>
    </Center>
  );
}
