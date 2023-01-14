import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './Control.module.css';
import { FormError } from '../Error/Error';

type Props = {
  name: string;
  id: string;
  label: string;
};

export const FormControl: FC<PropsWithChildren<Props>> = ({
  children,
  name,
  label,
  id
}) => {
  const formContext = useFormContext();

  const { isTouched, error } = formContext.getFieldState(name);

  return (
    <fieldset className={styles.formControl}>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      {isTouched && error?.message && <FormError error={error.message} />}
    </fieldset>
  );
};
