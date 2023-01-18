import { useModal } from '@/hooks/useModal';
import type {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode
} from 'react';
import { Dialog } from '@headlessui/react';
import { Surface } from '../../Surface/Surface';
import styles from './ModalContent.module.css';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import clsx from 'clsx';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  headerElement?: ReactNode;
  footerElement?: ReactNode;
  className?: string;
};
export const ModalContent: FC<PropsWithChildren<Props>> = ({
  size = 'lg',
  className,
  children,
  headerElement,
  footerElement
}) => {
  const style = {
    '--modal-content-max-width': `var(--breakpoints-${size})`
  } as CSSProperties;

  const { title } = useModal();

  return (
    <Dialog.Panel
      as="div"
      className={clsx(className, styles.modalContent)}
      style={style}
    >
      <Surface className={styles.inner}>
        {headerElement ?? title ? <ModalHeader v-if="title" /> : null}
        <div className={styles.body}>{children}</div>
        {footerElement && <footer>{footerElement}</footer>}
      </Surface>
    </Dialog.Panel>
  );
};
