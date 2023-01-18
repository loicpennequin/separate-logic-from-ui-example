import type { Nullable } from '@daria/shared';
import { createContext } from 'react';

export type ModalContext = {
  isOpened: boolean;
  closable: boolean;
  title: Nullable<string>;

  open(): void;
  close(): void;
  toggle(): void;
};

export const modalContext = createContext<ModalContext>({} as ModalContext);

// export type UseModalProviderOptions = Pick<
//   ModalContext,
//   'isOpened' | 'closable' | 'title'
// >;
// export const useModalProvider = ({
//   isOpened,
//   closable,
//   title
// }: UseModalProviderOptions) => {
//   const api: ModalContext = {
//     isOpened,
//     closable,
//     title,

//     open() {
//       isOpened.value = true;
//     },
//     close() {
//       isOpened.value = false;
//     },
//     toggle() {
//       isOpened.value = !isOpened.value;
//     }
//   };

//   provide(ModalInjectionKey, api);

//   return api;
// };

export const useModal = () => useContext(modalContext);
