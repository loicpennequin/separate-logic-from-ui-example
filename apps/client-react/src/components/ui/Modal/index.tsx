import { modalContext } from '@/hooks/useModal';
import type { FC, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styles from './Modal.module.css';

type Props = {
  isOpened: boolean;
  closable: boolean;
  title?: string;
  onChange: (val: boolean) => void;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  isOpened,
  closable,
  title,
  onChange,
  children
}) => {
  const context = {
    isOpened,
    title,
    closable,
    open() {
      onChange(true);
    },
    close() {
      onChange(false);
    },
    toggle() {
      onChange(!isOpened);
    }
  };

  const onClose = () => {
    if (closable) context.close();
  };

  return (
    <modalContext.Provider value={context}>
      <Transition appear show={context.isOpened} as="template">
        <Dialog
          as="div"
          className={styles.modal}
          static={closable}
          onClose={onClose}
        >
          <div>
            <div className={styles.backdrop} />
            {children}
          </div>
        </Dialog>
      </Transition>
    </modalContext.Provider>
  );
};
