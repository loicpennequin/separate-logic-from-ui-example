import type { Ref, InjectionKey } from 'vue';
import type { Nullable } from '@daria/shared';
import { useSafeInject } from './useSafeInject';

export type ModalContext = {
  isOpened: Ref<boolean>;
  closable: Ref<boolean>;
  title: Ref<Nullable<string>>;

  open(): void;
  close(): void;
  toggle(): void;
};

export const ModalInjectionKey = Symbol('Modal') as InjectionKey<ModalContext>;

export type UseModalProviderOptions = Pick<
  ModalContext,
  'isOpened' | 'closable' | 'title'
>;
export const useModalProvider = ({
  isOpened,
  closable,
  title
}: UseModalProviderOptions) => {
  const api: ModalContext = {
    isOpened,
    closable,
    title,

    open() {
      isOpened.value = true;
    },
    close() {
      isOpened.value = false;
    },
    toggle() {
      isOpened.value = !isOpened.value;
    }
  };

  provide(ModalInjectionKey, api);

  return api;
};

export const useModal = () => useSafeInject(ModalInjectionKey);
