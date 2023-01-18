import { EmailVerificationModes } from '@daria/shared';
import { ButtonLink } from '../ui/Button/Link/Link';
import styles from './VerifyEmailReminder.module.css';

export const VerifyEmailReminder = () => {
  const { data: session } = useSession();
  const { data: featureFlags } = useFeatureFlags();
  const { mutate: resendEmail, isSuccess } = useSendVerificationEmail();

  const isDisplayed =
    session &&
    !session.verifiedAt &&
    featureFlags?.EMAIL_VERIFICATION_ON_SIGNUP ===
      EmailVerificationModes.REMINDER;

  if (!isDisplayed) return null;

  return (
    <div role="alert" className={styles.verifyEmailReminder}>
      You have not verified your account yet.
      <ButtonLink onClick={() => resendEmail(session!.email)}>
        Resend e-mail
      </ButtonLink>
      {isSuccess && (
        <span>
          Email sent successfully. If you can&apos;t find it, please check your
          spam folder.
        </span>
      )}
    </div>
  );
};
