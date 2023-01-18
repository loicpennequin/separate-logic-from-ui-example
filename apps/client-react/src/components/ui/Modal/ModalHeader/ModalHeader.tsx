import { Dialog } from '@headlessui/react';
import { ButtonIcon } from '../../Button/Icon/Icon';
import { useModal } from '@/hooks/useModal';
import type { FC, PropsWithChildren } from 'react';
import IconClose from '~icons/mdi/close';

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
  const { title, closable, close } = useModal();

  return (
    <Dialog.Title as="template">
      <header className="modal-header">
        {children ?? <h2>{title}</h2>}

        {closable && (
          <ButtonIcon title="close" onClick={close}>
            <IconClose />
          </ButtonIcon>
        )}
      </header>
    </Dialog.Title>
  );
};
