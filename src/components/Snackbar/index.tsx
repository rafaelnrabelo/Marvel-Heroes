import styles from "./Snackbar.module.scss";

interface SnackbarProps {
  message: string;
  show: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, show }) => {
  return (
    <div
      className={show ? `${styles.show} ${styles.snackbar}` : styles.snackbar}
    >
      {message}
    </div>
  );
};

export default Snackbar;
