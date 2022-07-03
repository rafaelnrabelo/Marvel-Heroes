import styles from "./Loading.module.scss";

interface LoadingProps {
  size: "small" | "large";
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div
      className={
        size === "small"
          ? `${styles.small} ${styles.loading}`
          : `${styles.large} ${styles.loading}`
      }
    />
  );
};

export default Loading;
