import { Center } from '@/components/ui/Center/Center';
import { Surface } from '@/components/ui/Surface/Surface';
import { isString } from '@daria/shared';
import { useSearchParams } from 'react-router-dom';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, isSuccess, mutate: verifyEmail } = useVerifyEmail();

  const token = searchParams.get('token');

  useEffect(() => {
    if (isString(token)) verifyEmail(token);
  }, []);

  return (
    <Center>
      <Surface>
        {(!isString(token) || error) && (
          <p>
            We are not able to verify your email account. Did you arrive on this
            page by clicking the link in your signup confirmation email ?
          </p>
        )}

        {isLoading && <p>Verifying your email...</p>}
        {isSuccess && <p>Your account if now verified.</p>}
      </Surface>
    </Center>
  );
}
