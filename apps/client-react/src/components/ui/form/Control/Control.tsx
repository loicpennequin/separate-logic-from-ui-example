import type { FC, ReactNode } from 'react';

import styles from './Control.module.css';
import { FormError } from '../Error/Error';
import { useField } from 'formik';

type Props = {
  name: string;
  id: string;
  label: string;
  children: (options: any) => ReactNode;
};

export const FormControl: FC<Props> = ({ children, name, label, id }) => {
  const [field, meta] = useField(name);

  return (
    <fieldset className={styles.formControl}>
      {label && <label htmlFor={id}>{label}</label>}
      {children({ ...field, id })}
      {meta.touched && meta.error && <FormError error={meta.error} />}
    </fieldset>
  );
};
