import { useEffect, useState } from "react";
import styles from "../../styles/Toggle.module.scss";

interface ToggleProps {
  onChange: (value: boolean) => void;
  checked: boolean;
  style?: React.CSSProperties;
}

const Toggle: React.FC<ToggleProps> = ({ onChange, checked, style }) => {
  const handleToggle = () => {
    const newValue = !checked;
    onChange(newValue);
  };

  return (
    <button
      className={styles.toggle_container}
      onClick={handleToggle}
      style={style}
    >
      <span
        className={
          checked
            ? `${styles.toggle_circle} ${styles.toggle_circle_checked}`
            : styles.toggle_circle
        }
      />
    </button>
  );
};

export default Toggle;
