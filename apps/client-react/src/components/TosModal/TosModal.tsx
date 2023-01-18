import { isDefined, noop } from '@daria/shared';
import type { FC } from 'react';
import { Modal } from '../ui/Modal';
import { ModalContent } from '../ui/Modal/ModalContent/ModalContent';
import { ButtonCta } from '../ui/Button/Cta/Cta';
import styles from './TosModal.module.css';

type Props = { isOpened?: boolean; onChange?: (val: boolean) => void };

export const TosModal: FC<Props> = ({ isOpened, onChange }) => {
  const isControlled = useMemo(() => isDefined(isOpened), [isOpened]);

  const { data: tos } = useLatestTos();
  const { data: session, refetch } = useSession();

  const { mutate: logout } = useLogout();
  const { mutate: acceptTos } = useAcceptTos({
    onSuccess() {
      refetch();
    }
  });

  const _isOpened = useMemo(() => {
    if (isControlled) return isOpened as boolean;

    if (!session) return false;
    if (!tos) return false;
    if (!session.tosAcceptedAt) return true;

    return tos.createdAt.getTime() > session.tosAcceptedAt?.getTime();
  }, [isControlled, session, tos, isOpened]);

  return (
    <Modal
      isOpened={_isOpened}
      onChange={onChange ?? noop}
      title="Terms and Conditions"
      closable={isControlled}
    >
      <ModalContent
        className={styles.tosModal}
        footerElement={
          !isControlled && (
            <div className={styles.footerInner}>
              <ButtonCta variant="error" onClick={() => logout(undefined)}>
                Refuse
              </ButtonCta>
              <ButtonCta onClick={() => acceptTos(undefined)}>Accept</ButtonCta>
            </div>
          )
        }
      >
        <p>Please accept our updated terms and conditions</p>

        {tos && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: tos.content }}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
