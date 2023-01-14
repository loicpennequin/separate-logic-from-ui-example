import IconAlert from '~icons/mdi/alert';
import styles from './Error.module.css';

type Props = { error: string };
export const FormError = ({ error }: Props) => {
  return (
    <div className={styles.formError}>
      <IconAlert />
      {error}
    </div>
  );
};
